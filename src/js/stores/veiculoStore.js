var React = require('react')
var EventEmitter = require('events').EventEmitter
var FluxDispatcher = require('../dispatcher/dispatcher.js')
var assign = require('object-assign')
var CHANGE_EVENT = 'change'

var tableColumns = [
  {label: "Placa", value: 'placa'},
  {label: "Renavam", value: 'renavam'},
  {label: "Fabricante", value: 'fabricante'},
  {label: "Modelo", value: 'modelo'},
  {label: "Ano", value: 'ano'},
  {label: "Dono", value: 'dono'}
]
var listaClientes = []

//CREATE TABLE veiculo(
//  placa 			VARCHAR(10) PRIMARY KEY,
//  renavam 		VARCHAR(20),
//  fabricante 		VARCHAR(40),
//  modelo 			VARCHAR(40),
//  ano 			INTEGER,
//  dono			INTEGER REFERENCES usuario(codigoCadastro) NOT NULL
//);
var tableData = []

var VeiculoStore = assign({}, EventEmitter.prototype, {
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
    switch(dispatchedObj.actionType){
      case "changeVeiculo":
        VeiculoStore.emitChange("refetch")
        break;
      case "readVeiculo":
        tableData = dispatchedObj.rows
        VeiculoStore.emitChange("rerender")
        break

      case "GET_CLIENTES":
        listaClientes = dispatchedObj.clientes
        VeiculoStore.emitChange("rerender")
        break;
    }
  })
})

module.exports = VeiculoStore