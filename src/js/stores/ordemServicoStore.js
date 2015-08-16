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

var tipoServico = []
var clientes = []
var listaVeiculos = []
var listaPecas = []
var listaEquipes = []

var OrdemServicoStore = assign({}, EventEmitter.prototype, {
  getTableData: function(){
    return tableData
  },
  getTableColumns: function(){
    return tableColumns
  },
  getTipoServico: function(){
    return tipoServico
  },
  getClientes: function(){
    return clientes
  },
  getListaVeiculos: function(){
    return listaVeiculos
  },
  getListaPecas: function(){
    return listaPecas
  },
  getListaEquipes: function(){
    return listaEquipes
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
      case "changeOrdemServico":
        OrdemServicoStore.emitChange("refetch")
        break;
      case "readOrdemServico":
        tableData = dispatchedObj.rows
        OrdemServicoStore.emitChange("rerender")
        break

      case "GET_TIPO_SERVICO":
        tipoServico = dispatchedObj.tipoServico.map(function(servico){
          return {
            value: servico.id,
            label: servico.nome,
            preco: parseFloat(servico.preco.replace(/[^0-9\.]+/g,""))
          }
        })
        OrdemServicoStore.emitChange("rerender")
        break

      case "GET_CLIENTES":
        clientes = dispatchedObj.clientes
        OrdemServicoStore.emitChange("rerender")
        break
      case "GET_VEICULO":
        listaVeiculos = dispatchedObj.veiculos

        OrdemServicoStore.emitChange("rerender")
        break
      case "GET_PECAS":
        listaPecas = dispatchedObj.pecas.map(function(peca){
          return {
            value: peca.idpeca,
            label: peca.nome,
            preco: peca.preco,
            quantidade: peca.quantidade
          }
        })
        OrdemServicoStore.emitChange("rerender")
        break
      case "GET_EQUIPES":
        listaEquipes = dispatchedObj.equipes
        OrdemServicoStore.emitChange("rerender")
        break

      default:
    }
  })
})

module.exports = OrdemServicoStore