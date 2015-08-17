var React = require('react');
var jquery = require('jquery')
var u = require('underscore')
var moment = require('moment')
var AgendarHorarioStore = require('../../../stores/agendarHorarioStore')

var AgendarHorarioActions = require('../../../actions/agendarHorarioActions')

var SessionStore = require('../../../stores/sessionStore')

var Table = React.createFactory(require('react-bootstrap').Table)
var Button = React.createFactory(require('react-bootstrap').Button)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var Input = React.createFactory(require('react-bootstrap').Input)
var CreateModal = React.createFactory(require('./createModalHorario'))
var UpdateModal = React.createFactory(require('./updateModalHorario'))
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
  getInitialState: function(){
    console.log(AgendarHorarioStore.getTableColumns())
    return {
      tableColumns: AgendarHorarioStore.getTableColumns(),
      tableData: AgendarHorarioStore.getTableData(),
      showCreateModal: false,
      showUpdateModal: false,
      selectedUpdateData: {},
      listaHorarios: AgendarHorarioStore.getHorarios(),
      listaClientes: AgendarHorarioStore.getListaClientes(),
      listaGerentes: AgendarHorarioStore.getListaGerentes(),
      listaVeiculos: AgendarHorarioStore.getListaVeiculos()
    }
  },
  componentDidMount: function(){
    AgendarHorarioStore.addChangeListener("refetch", this._read)
    AgendarHorarioStore.addChangeListener("rerender", this._dataChange)
    AgendarHorarioActions.getClientes()
    AgendarHorarioActions.getGerentes()
    AgendarHorarioActions.readAgendarHorario()
    AgendarHorarioActions.getHorariosDisponiveis(minDate)
  },
  componentWillUnmount: function(){
    AgendarHorarioStore.removeChangeListener("refetch", this._read)
    AgendarHorarioStore.removeChangeListener("rerender", this._dataChange)
  },
  _dataChange: function(){
    var newTableData = jquery.extend(true, {}, AgendarHorarioStore.getTableData())
    newTableData = u.filter(newTableData, function(row){
      return row.codgerente == SessionStore.getId()
    })
    this.setState({
      tableData: newTableData,
      listaHorarios: AgendarHorarioStore.getHorarios(),
      listaClientes: AgendarHorarioStore.getListaClientes(),
      listaGerentes: AgendarHorarioStore.getListaGerentes(),
      listaVeiculos: AgendarHorarioStore.getListaVeiculos()
    })
  },
  _read: function(){
    AgendarHorarioActions.readAgendarHorario()
  },
  _toggleCreate: function(){
    this.setState({showCreateModal: !this.state.showCreateModal})
  },
  _closeUpdateModal: function(){
    this.setState({showUpdateModal: false})
  },
  _editClick: function(data, hora, codgerente, idcliente, placaveiculo){
    var updateData = u.findWhere(this.state.tableData, {data: data, hora: hora,
      codgerente: codgerente, idcliente: idcliente, placaveiculo: placaveiculo})
    this.setState({showUpdateModal: true, selectedUpdateData: updateData})
  },
  _removeClick: function(data, hora, codgerente, idcliente, placaveiculo){
    var values = {}
    values.data = data
    values.hora = hora
    values.codgerente = codgerente
    values.idcliente = idcliente
    values.placaveiculo = placaveiculo
    AgendarHorarioActions.deleteAgendarHorario(values)
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
        UpdateModal({
          show: this.state.showUpdateModal,
          onHide: this._closeUpdateModal,
          data: this.state.selectedUpdateData,
          horarios: this.state.listaHorarios,
          clientes: this.state.listaClientes,
          gerentes: this.state.listaGerentes,
          veiculos: this.state.listaVeiculos
        }),
        CreateModal({
          show: this.state.showCreateModal,
          onHide: this._toggleCreate,
          horarios: this.state.listaHorarios,
          clientes: this.state.listaClientes,
          gerentes: this.state.listaGerentes,
          veiculos: this.state.listaVeiculos
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
    //content.push(th({key: 'actions'}, 'Ações'))
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
    var content = []
    content = this.props.data.map(function(row, index){
      var rowContent = this.props.tableColumns.map(function(column){
        return td({key: 'column-'+column.value+'-'+index}, row[column.value])
      })
      //rowContent.push(td({key: "actions-"+index},
      //  p({onClick: this.props.onEditClick.bind(null, row.data, row.hora, row.codgerente, row.idcliente, row.placaveiculo)}, 'Editar, '),
      //  p({onClick: this.props.onRemoveClick.bind(null, row.data, row.hora, row.codgerente, row.idcliente, row.placaveiculo)}, "Remover")))
      var singleRow = tr({key: 'content-'+index}, rowContent)
      return singleRow
    }.bind(this))
    return(
      tbody({}, content)
    )
  }
})

module.exports = CrudHorario
