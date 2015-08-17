var React = require('react')
var EventEmitter = require('events').EventEmitter
var FluxDispatcher = require('../dispatcher/dispatcher.js')
var assign = require('object-assign')

var tableColumns = [
	{label: "#", value: 'codigocadastro'},
	{label: "Nome", value: 'nome'},
	{label: "Sobrenome", value: 'sobrenome'},
  {label: "E-mail", value: 'email'},
  {label: "Senha", value: 'senha'},
  {label: "CPF", value: 'cpf'},
  {label: "Estado", value: 'estado'},
  {label: "Cidade", value: 'cidade'},
  {label: "CEP", value: 'cep'},
  {label: "Rua", value: 'rua'},
  {label: "Número Rua", value: 'numerorua'},
  {label: "Complemento", value: 'complemento'},
  {label: "Telefone", value: 'telefone'},
  {label: "Bairro", value: 'bairro'},
  {label: "Tipo", value: 'tipo'},
  {label: "Especialidade", value: 'especialidade'}
]

var tableData = []

var UsuarioStore = assign({}, EventEmitter.prototype, {
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
      case "changeUsuario":
        UsuarioStore.emitChange("refetch")
        break;
      case "readUsuario":
      	tableData = dispatchedObj.rows
      	UsuarioStore.emitChange("rerender")
      	break
    }
  })
})

module.exports = UsuarioStore