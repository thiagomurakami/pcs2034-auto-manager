var React = require('react')
var EventEmitter = require('events').EventEmitter
var FluxDispatcher = require('../dispatcher/dispatcher.js')
var assign = require('object-assign')

var tableColumns = [
	{label: "#", value: 'id'},
	{label: "Tipo de serviço", value: 'nome'},
	{label: "Preço", value: 'preco'}
]
var tableData = []

var TipoDeServicoStore = assign({}, EventEmitter.prototype, {
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
      case "changeTipoDeServico":
        TipoDeServicoStore.emitChange("refetch")
        break;
      case "readTipoDeServico":
      	console.log(dispatchedObj.rows)
      	tableData = dispatchedObj.rows
      	TipoDeServicoStore.emitChange("rerender")
      	break
    }
  })
})

module.exports = TipoDeServicoStore