var React = require('react')
var EventEmitter = require('events').EventEmitter
var FluxDispatcher = require('../dispatcher/dispatcher.js')
var assign = require('object-assign')
var CHANGE_EVENT = 'change'

var tableColumns = [
  {label: "Data", value: 'data'},
  {label: "Hora", value: 'hora'},
  {label: "Técnico", value: 'codtecnico'},
  {label: "Cliente", value: 'idcliente'}
]
var listaClientes = []
var listaHorarios = []

//CREATE TABLE veiculo(
//  placa 			VARCHAR(10) PRIMARY KEY,
//  renavam 		VARCHAR(20),
//  fabricante 		VARCHAR(40),
//  modelo 			VARCHAR(40),
//  ano 			INTEGER,
//  dono			INTEGER REFERENCES usuario(codigoCadastro) NOT NULL
//);
var tableData = []

var AgendarHorarioStore = assign({}, EventEmitter.prototype, {
  getTableData: function(){
    return tableData
  },
  getTableColumns: function(){
    return tableColumns
  },
  getListaClientes: function(){
    return listaClientes
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
    console.log(dispatchedObj)
    switch(dispatchedObj.actionType){
      case "changeAgendarHorario":
        AgendarHorarioStore.emitChange("refetch")
        break;
      case "readAgendarHorario":
        console.log(dispatchedObj.rows)
        tableData = dispatchedObj.rows
        AgendarHorarioStore.emitChange("rerender")
        break

      case "GET_CLIENTES":
        listaClientes = dispatchedObj.clientes
        AgendarHorarioStore.emitChange("rerender")
        break;
      case "GET_HORARIOS":
        console.log(dispatchedObj)
        break
    }
  })
})

module.exports = AgendarHorarioStore