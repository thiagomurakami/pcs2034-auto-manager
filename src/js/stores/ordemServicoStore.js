var React = require('react')
var EventEmitter = require('events').EventEmitter
var FluxDispatcher = require('../dispatcher/dispatcher.js')
var assign = require('object-assign')

var tableColumns = [
  {label: "ID", value: 'idpeca'},
  {label: "Nome", value: 'nome'},
  {label: "Preço", value: 'preco'},
  {label: "Marca", value: 'marca'},
  {label: "Qtd", value: 'quantidade'},
  {label: "Descrição", value: 'descricao'}
]
var tableData = []

var OrdemServicoStore = assign({}, EventEmitter.prototype, {
  getTableData: function(){
    return tableData
  },
  getTableColumns: function(){
    return tableColumns
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
      case "changePeca":
        OrdemServicoStore.emitChange("refetch")
        break;
      case "readPeca":
        tableData = dispatchedObj.rows
        OrdemServicoStore.emitChange("rerender")
        break
    }
  })
})

module.exports = OrdemServicoStore