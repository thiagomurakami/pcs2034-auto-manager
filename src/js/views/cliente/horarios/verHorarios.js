var React = require('react');
var u = require('underscore')
var moment = require('moment')
var Navigation = require('react-router').Navigation

var AgendarHorarioStore = require('../../../stores/agendarHorarioStore')

var AgendarHorarioActions = require('../../../actions/agendarHorarioActions')

var SessionStore = require('../../../stores/sessionStore')

var Table = React.createFactory(require('react-bootstrap').Table)
var Button = React.createFactory(require('react-bootstrap').Button)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var Input = React.createFactory(require('react-bootstrap').Input)
var DeleteModal = React.createFactory(require('./deleteModalHorario'))
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

var minDate = moment().format('YYYY-MM-DD')

var CrudHorario = React.createClass({
  mixins: [Navigation],
  getInitialState: function(){
    return {
      tableColumns: AgendarHorarioStore.getTableColumnsClientes(),
      tableData: AgendarHorarioStore.getTableData(),
      showCreateModal: false,
      showUpdateModal: false,
      selectedUpdateData: {},
    }
  },
  componentDidMount: function(){
    AgendarHorarioStore.addChangeListener("refetch", this._read)
    AgendarHorarioStore.addChangeListener("rerender", this._dataChange)
    AgendarHorarioActions.readAgendarHorarioCliente(SessionStore.getId())
  },
  componentWillUnmount: function(){
    AgendarHorarioStore.removeChangeListener("refetch", this._read)
    AgendarHorarioStore.removeChangeListener("rerender", this._dataChange)
  },
  _dataChange: function(){
    this.setState({
      tableData: AgendarHorarioStore.getTableData(),
    })
  },
  _read: function(){
    AgendarHorarioActions.readAgendarHorarioCliente(SessionStore.getId())
  },
  _toggleCreate: function(){
    this.transitionTo('agendarHorarioCliente')
  },
  _closeUpdateModal: function(){
    this.setState({showUpdateModal: false})
  },
  _editClick: function(data, hora, codgerente, idcliente, placaveiculo){
    var updateData = u.findWhere(this.state.tableData, {data: data, hora: hora,
      codgerente: codgerente, idcliente: idcliente, placaveiculo: placaveiculo})
    this.setState({showUpdateModal: true, selectedUpdateData: updateData})
  },
  _removeClick: function(rowData){
    this.setState({deleteData: rowData, showUpdateModal: true})
  },
  _deleteModalClick: function(){
    AgendarHorarioActions.deleteAgendarHorario(this.state.deleteData)
    this.setState({showUpdateModal: false})
  },
  render: function(){
    var tableProps = {
      striped: true,
      bordered: true,
      densed: true,
      hover: true,
      responsive: true
    }
    var Header = React.createFactory(TableHeader)
    var Body = React.createFactory(TableBody)
    return (


      div({},
        DeleteModal({
          show: this.state.showUpdateModal,
          onHide: this._closeUpdateModal,
          data: this.state.selectedUpdateData,
          cancelar: this._deleteModalClick
        }),
        Table(tableProps,
          Header({tableColumns: this.state.tableColumns}),
          Body({tableColumns: this.state.tableColumns,
            data: this.state.tableData,
            onEditClick: this._editClick,
            onRemoveClick: this._removeClick})
        ),
        Button({onClick: this._toggleCreate},
          "Adicionar novo horário")
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
      onRemoveClick: function(){}
    }
  },
  render: function(){
    var content = this.props.data.map(function(row, index){
      var rowContent = this.props.tableColumns.map(function(column){
        return td({key: 'column-'+column.value+'-'+index}, row[column.value])
      })
      var rowData = {}
      rowData.data = row.data
      rowData.hora = row.hora
      rowData.codgerente = row.codgerente
      rowData.idcliente = row.idcliente
      rowData.placaveiculo = row.placaveiculo
      rowContent.push(td({key: "actions-"+index},
        p({onClick: this.props.onRemoveClick.bind(null, rowData)}, "Remover")))
      return tr({key: 'content-'+index}, rowContent)
    }.bind(this))
    return(
      tbody({}, content)
    )
  }
})

module.exports = CrudHorario
