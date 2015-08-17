var React = require('react');
var u = require('underscore')

var Navigation = require('react-router').Navigation
var OrdemServicoStore = require('../../../stores/ordemServicoStore')

var OrdemServicoActions = require('../../../actions/ordemServicoActions')

var Table = React.createFactory(require('react-bootstrap').Table)
var Button = React.createFactory(require('react-bootstrap').Button)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var Input = React.createFactory(require('react-bootstrap').Input)
//var CreateModal = React.createFactory(require('./createModalPeca'))
//var UpdateModal = React.createFactory(require('./updateModalPeca'))
var div = React.createFactory('div')
var p = React.createFactory('p')
var h4 = React.createFactory('h4')
var form = React.createFactory('form')
var thead = React.createFactory('thead')
var table = React.createFactory('table')
var tbody = React.createFactory('tbody')
var th = React.createFactory('th')
var td = React.createFactory('td')
var tr = React.createFactory('tr')
var span = React.createFactory('span')

var CrudOrdemServico = React.createClass({
  mixins: [Navigation],

  getInitialState: function(){
    return {
      tableColumns: OrdemServicoStore.getTableColumns(),
      tableData: OrdemServicoStore.getTableData(),
      selectedUpdateData: {},
      updateModalIndex: 0
    }
  },
  componentDidMount: function(){
    OrdemServicoStore.addChangeListener("refetch", this._read)
    OrdemServicoStore.addChangeListener("rerender", this._dataChange)
    OrdemServicoActions.readOrdemServico()
  },

  componentWillUnmount: function(){
    OrdemServicoStore.removeChangeListener("refetch", this._read)
    OrdemServicoStore.removeChangeListener("rerender", this._dataChange)
  },

  _dataChange: function(){
    this.setState({tableData: OrdemServicoStore.getTableData()})
  },
  _read: function(){
    OrdemServicoActions.readOrdemServico()
  },
  _toggleCreate: function(){
    this.transitionTo('criarOs')
  },
  _closeUpdateModal: function(){
    this.setState({showUpdateModal: false})
  },
  _editClick: function(index){
    this.transitionTo('editarOs', {id: index})
  },
  _removeClick: function(index){
    //OrdemServicoActions.deletePeca(index)

  },
  render: function(){
    var tableProps = {
      striped: true,
      bordered: true,
      condensed: true,
      hover: true,
      responsive: true
    }
    var Header = React.createFactory(TableHeader)
    var Body = React.createFactory(TableBody)
    return (
      div({},
        Table(tableProps,
          Header({tableColumns: this.state.tableColumns}),
          Body({tableColumns: this.state.tableColumns,
            data: this.state.tableData,
            onEditClick: this._editClick,
            onRemoveClick: this._removeClick})
        ),
        Button({onClick: this._toggleCreate},
          "Adicionar nova OS")
      )

    )
  }
})

var TableHeader = React.createClass({
  getDefaultProps: function(){
    return {tableColumns: []}
  },
  render: function(){
    var content = this.props.tableColumns.map(function(column){
      return th({key: column.value}, column.label)
    })
    content.push(th({key: 'actions'}, 'Ações'))
    return(
      thead({},
        content
      )
    )
  }
})

var TableBody = React.createClass({
  getDefaultProps: function(){
    return {
      tableColumns: [],
      data: [],
      onEditClick: function(){},
      onRemoveClick: function(){},
    }
  },
  render: function(){
    var content = this.props.data.map(function(row, index){
      var rowContent = this.props.tableColumns.map(function(column){
        return td({key: 'column-'+column.value+'-'+index}, row[column.value])
      })
      rowContent.push(td({key: "actions-"+index},
        p({onClick: this.props.onEditClick.bind(null, row.id)}, 'Editar, '),
        p({onClick: this.props.onRemoveClick.bind(null, row.id)}, "Remover")))
      var singleRow = tr({key: 'content-'+index}, rowContent)
      return singleRow
    }.bind(this))
    return(
      tbody({}, content)
    )
  }
})

module.exports = CrudOrdemServico