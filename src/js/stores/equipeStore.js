var React = require('react')
var u = require('underscore')
var EventEmitter = require('events').EventEmitter
var FluxDispatcher = require('../dispatcher/dispatcher.js')
var assign = require('object-assign')

var tableColumns = [
  {label: "ID", value: 'idequipe'},
  {label: "Tecnico 1", value: 'tecnico1'},
  {label: "Especialidade", value: 'especialidade1'},
  {label: "Tecnico 2", value: 'tecnico2'},
  {label: "Especialidade", value: 'especialidade2'},
  {label: "Especialidade Equipe", value: 'especialidade'}
]
var tableData = []
var listaTecnicos = []

var EquipeStore = assign({}, EventEmitter.prototype, {
  getTableData: function(){
    return tableData
  },
  getListaTecnicos: function(){
    return listaTecnicos
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
        dispatchedObj.rows.forEach(function(row){
          if(listaTecnicos.length > 0){
            var primeiroTecnico = u.findWhere(listaTecnicos, {codigocadastro: row.codtecnico1})
            var segundoTecnico = u.findWhere(listaTecnicos, {codigocadastro: row.codtecnico2})
            row.tecnico1 = row.codtecnico1+" - "+primeiroTecnico.nome
            if(primeiroTecnico.sobrenome) row.tecnico1 += " "+primeiroTecnico.sobrenome
            row.tecnico2 = row.codtecnico2+" - "+segundoTecnico.nome
            if(segundoTecnico.sobrenome) row.tecnico2 += " "+segundoTecnico.sobrenome
            row.especialidade1 = primeiroTecnico.especialidade
            row.especialidade2 = segundoTecnico.especialidade
          }
        })
        tableData = dispatchedObj.rows
        EquipeStore.emitChange("rerender")
        break

      case "GET_TECNICOS":
        listaTecnicos = dispatchedObj.tecnicos
        tableData.forEach(function(row){
          var primeiroTecnico = u.findWhere(listaTecnicos, {codigocadastro: row.codtecnico1})
          var segundoTecnico = u.findWhere(listaTecnicos, {codigocadastro: row.codtecnico2})
          row.tecnico1 = row.codtecnico1+" - "+primeiroTecnico.nome
          if(primeiroTecnico.sobrenome) row.tecnico1 += " "+primeiroTecnico.sobrenome
          row.tecnico2 = row.codtecnico2+" - "+segundoTecnico.nome
          if(segundoTecnico.sobrenome) row.tecnico2 += " "+segundoTecnico.sobrenome
          row.especialidade1 = primeiroTecnico.especialidade
          row.especialidade2 = segundoTecnico.especialidade
        })
        EquipeStore.emitChange("rerender")
        break
    }
  })
})

module.exports = EquipeStore