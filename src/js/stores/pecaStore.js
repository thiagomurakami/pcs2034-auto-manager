var React = require('react')
var EventEmitter = require('events').EventEmitter
var FluxDispatcher = require('../dispatcher/dispatcher.js')
var assign = require('object-assign')
var CHANGE_EVENT = 'change'

var tableColumns = [
	{label: "#", value: 'idpeca'},
	{label: "Peca", value: 'nome'},
  {label: "Marca", value: 'marca'},
	{label: "Preço", value: 'preco'},
  {label: "Quantidade", value: 'quantidade'},
  {label: "Descrição", value: 'descricao'},
]
var tableData = []

var PecaStore = assign({}, EventEmitter.prototype, {
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
    console.log(dispatchedObj)
    switch(dispatchedObj.actionType){
      case "changePeca":
        PecaStore.emitChange("refetch")
        break;
      case "readPeca":
      	console.log(dispatchedObj.rows)
      	tableData = dispatchedObj.rows
      	PecaStore.emitChange("rerender")
      	break
    }
  })
})

module.exports = PecaStore