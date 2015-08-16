var React = require('react');
var u = require('underscore')

var EquipeStore = require('../../../stores/equipeStore')

var EquipeActions = require('../../../actions/equipeAction')

var Table = React.createFactory(require('react-bootstrap').Table)
var Button = React.createFactory(require('react-bootstrap').Button)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var Input = React.createFactory(require('react-bootstrap').Input)
var CreateModal = React.createFactory(require('./createModalEquipe'))
var UpdateModal = React.createFactory(require('./updateModalEquipe'))
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

var CrudPeca = React.createClass({
  getInitialState: function(){
    return {
      tableColumns: EquipeStore.getTableColumns(),
      tableData: EquipeStore.getTableData(),
      showCreateModal: false,
      showUpdateModal: false,
      selectedUpdateData: {},
      updateModalIndex: 0,
      listaTecnicos: EquipeStore.getListaTecnicos()
    }
  },
  componentDidMount: function(){
    EquipeStore.addChangeListener("refetch", this._read)
    EquipeStore.addChangeListener("rerender", this._dataChange)
    EquipeActions.readEquipe()
    EquipeActions.getTecnicos()
  },

  componentWillUnmount: function(){
    EquipeStore.removeChangeListener("refetch", this._read)
    EquipeStore.removeChangeListener("rerender", this._dataChange)
  },

  _dataChange: function(){
    this.setState({tableData: EquipeStore.getTableData(), listaTecnicos: EquipeStore.getListaTecnicos()})
  },
  _read: function(){
    EquipeActions.readEquipe()
  },
  _toggleCreate: function(){
    this.setState({showCreateModal: !this.state.showCreateModal})
  },
  _closeUpdateModal: function(){
    this.setState({showUpdateModal: false})
  },
  _editClick: function(index){
    var updateData = u.filter(this.state.tableData, function(singleData){
      return singleData.idequipe == index
    })
    this.setState({showUpdateModal: true, updateModalIndex: index, selectedUpdateData: updateData[0]})
  },
  _removeClick: function(index){
    EquipeActions.deleteEquipe(index)
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
        UpdateModal({
          show: this.state.showUpdateModal,
          onHide: this._closeUpdateModal,
          data: this.state.selectedUpdateData,
          index: this.state.updateModalIndex,
          tecnicos: this.state.listaTecnicos
        }),
        CreateModal({
          show: this.state.showCreateModal,
          onHide: this._toggleCreate,
          tecnicos: this.state.listaTecnicos
        }),
        Table(tableProps,
          Header({tableColumns: this.state.tableColumns}),
          Body({tableColumns: this.state.tableColumns,
            data: this.state.tableData,
            onEditClick: this._editClick,
            onRemoveClick: this._removeClick})
        ),
        Button({onClick: this._toggleCreate},
          "Adicionar nova equipe")
      )

    )
  }
})

var TableHeader = React.createClass({
  getDefaultProps: function(){
    return {tableColumns: []}
  },
  render: function(){
    var content = []
    content = this.props.tableColumns.map(function(column){
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
    var content = []
    content = this.props.data.map(function(row, index){
      var rowContent = this.props.tableColumns.map(function(column){
        return td({key: 'column-'+column.value+'-'+index}, row[column.value])
      })
      rowContent.push(td({key: "actions-"+index},
        p({onClick: this.props.onEditClick.bind(null, row.idequipe)}, 'Editar, '),
        p({onClick: this.props.onRemoveClick.bind(null, row.idequipe)}, "Remover")))
      var singleRow = tr({key: 'content-'+index}, rowContent)
      return singleRow
    }.bind(this))
    return(
      tbody({}, content)
    )
  }
})

module.exports = CrudPeca