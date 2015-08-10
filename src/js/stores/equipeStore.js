var React = require('react')
var EventEmitter = require('events').EventEmitter
var FluxDispatcher = require('../dispatcher/dispatcher.js')
var assign = require('object-assign')

var tableColumns = [
  {label: "ID", value: 'idequipe'},
  {label: "Tecnico 1", value: 'tecnico1'},
  {label: "Tecnico 2", value: 'tecnico2'}
]
var tableData = []

var EquipeStore = assign({}, EventEmitter.prototype, {
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
      case "changeEquipe":
        EquipeStore.emitChange("refetch")
        break;
      case "readEquipe":
        tableData = dispatchedObj.rows
        EquipeStore.emitChange("rerender")
        break
    }
  })
})

module.exports = EquipeStore