var React = require('react')
var u = require('underscore')
var EventEmitter = require('events').EventEmitter
var FluxDispatcher = require('../dispatcher/dispatcher.js')
var assign = require('object-assign')
var CHANGE_EVENT = 'change'

var tableColumns = [
  {label: "Data", value: 'data'},
  {label: "Hora", value: 'hora'},
  {label: "Técnico", value: 'tecnico'},
  {label: "Cliente", value: 'cliente'},
  {label: "Placa Veículo", value: 'placaveiculo'}
]
var tableColumnsCliente = [
  {label: "Data", value: 'data'},
  {label: "Hora", value: 'hora'},
  {label: "Técnico", value: 'tecnico'},
  {label: "Placa Veículo", value: 'placaveiculo'}
]

var listaClientes = []
var listaHorarios = []
var listaGerentes = []
var listaVeiculos = []

var tableData = []

var AgendarHorarioStore = assign({}, EventEmitter.prototype, {
  getTableData: function(){
    return tableData
  },
  getTableColumns: function(){
    return tableColumns
  },
  getTableColumnsClientes: function(){
    return tableColumnsCliente
  },
  getListaClientes: function(){
    return listaClientes
  },
  getListaGerentes: function(){
    return listaGerentes
  },
  getListaVeiculos: function(){
    return listaVeiculos
  },
  getHorarios: function(){
    return listaHorarios
  },
  emitChange: function(eventString){
    this.emit(eventString)
  },

  addChangeListener: function(eventString, callback){
    this.on(eventString, callback)
  },

  removeChangeListener: function(eventString, callback){
    this.removeListener(eventString, callback)
  },

  dispatcherIndex: FluxDispatcher.register(function(dispatchedObj){
    switch(dispatchedObj.actionType){
      case "changeAgendarHorario":
        AgendarHorarioStore.emitChange("refetch")
        break;
      case "readAgendarHorario":
        dispatchedObj.rows.forEach(function(row){
          if(listaGerentes.length > 0){
            var gerenteUnico = u.findWhere(listaGerentes, {codigocadastro: row.codgerente})
            if(!row.tecnico){
              row.tecnico = ""
            }
            row.tecnico += row.codgerente+" - "+gerenteUnico.nome
            if(gerenteUnico.sobrenome) row.tecnico += " "+gerenteUnico.sobrenome
          }
          if(listaClientes.length > 0){
            var clienteUnico = u.findWhere(listaClientes, {codigocadastro: row.idcliente})
            if(!row.cliente){
              row.cliente = ""
            }
            row.cliente += row.idcliente+" - "+clienteUnico.nome
            if(clienteUnico.sobrenome) row.cliente += " "+clienteUnico.sobrenome
          }
        })
        tableData = dispatchedObj.rows
        AgendarHorarioStore.emitChange("rerender")
        break

      case "GET_CLIENTES":
        listaClientes = dispatchedObj.clientes
        tableData.forEach(function(row){
          var clienteUnico = u.findWhere(listaClientes, {codigocadastro: row.idcliente})
          if(!row.cliente){
            row.cliente = ""
          }
          row.cliente += row.idcliente+" - "+clienteUnico.nome
          if(clienteUnico.sobrenome) row.cliente += " "+clienteUnico.sobrenome
        })
        AgendarHorarioStore.emitChange("rerender")
        break;

      case "GET_HORARIOS":
        listaHorarios = dispatchedObj.horarios
        AgendarHorarioStore.emitChange("rerender")
        break

      case "GET_GERENTES":
        listaGerentes = dispatchedObj.gerentes
        tableData.forEach(function(row){
          var gerenteUnico = u.findWhere(listaGerentes, {codigocadastro: row.codgerente})
          if(!row.tecnico){
            row.tecnico = ""
          }
          row.tecnico += row.codgerente+" - "+gerenteUnico.nome
          if(gerenteUnico.sobrenome) row.tecnico += " "+gerenteUnico.sobrenome
        })
        AgendarHorarioStore.emitChange("rerender")
        break

      case "GET_VEICULO":
        listaVeiculos = dispatchedObj.veiculos

        AgendarHorarioStore.emitChange("rerender")
        break
    }
  })
})

module.exports = AgendarHorarioStore