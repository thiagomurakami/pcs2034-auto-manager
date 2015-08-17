var jajax = require('jquery').ajax
var u = require('underscore')
var AppDispatcher = require('../dispatcher/dispatcher')

var uri = '/apiv1/'
var _pendingRequests = {}

function abortPendingRequestsIfPending(key){
  if(_pendingRequests[key]){
    if(_pendingRequests[key].readyState != 4){
      _pendingRequests[key].abort()
    }
  }
}

var OrdemServicoActions = {
  createOrdemServico: function(values) {
    var requestBody = {
      values: values
    }
    var key = "createPeca"
    _pendingRequests[key] = jajax({
      url: 'apiv1/criarOs',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeOrdemServico"
      })
    })
  },
  readOrdemServico: function(){
    var requestBody = {
      table: "ordemServico"
    }
    var key = "readOrdemServico"
    _pendingRequests[key] = jajax({
      url: 'apiv1/read',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "readOrdemServico",
        rows: res
      })
    })
  },
  updateOrdemServico: function(values, id){
    values.idpeca = id
    var requestBody = {
      table: "peca",
      values: values
    }
    var key = "updatePeca"
    _pendingRequests[key] = jajax({
      url: 'apiv1/update',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeOrdemServico"
      })
    })

  },
  deleteOrdemServico: function(id){
    var values = {}
    values.idpeca = id
    var requestBody = {
      table: "peca",
      values: values
    }
    var key = "deletePeca"
    _pendingRequests[key] = jajax({
      url: 'apiv1/delete',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeOrdemServico"
      })
    })
  },

  getTipoServico: function(){
    var key = "getTipoServico"
    _pendingRequests[key] = jajax({
      url: 'apiv1/tipoServico/',
      type: 'GET',
      contentType: 'application/json',
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "GET_TIPO_SERVICO",
        tipoServico: res
      })
    })
  },

  getClientes: function(){
    var key = "getClientes"
    _pendingRequests[key] = jajax({
      url: 'apiv1/clientes',
      type: 'GET',
      contentType: 'application/json',
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "GET_CLIENTES",
        clientes: res
      })
    })
  },

  getVeiculos: function(idCliente){
    var key = "getVeiculo"
    _pendingRequests[key] = jajax({
      url: 'apiv1/veiculo/'+idCliente,
      type: 'GET',
      contentType: 'application/json',
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "GET_VEICULO",
        veiculos: res
      })
    })
  },

  getPecas: function(){
    var key = "getPecas"
    _pendingRequests[key] = jajax({
      url: 'apiv1/pecas/',
      type: 'GET',
      contentType: 'application/json',
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "GET_PECAS",
        pecas: res
      })
    })
  },

  getEquipes: function(date){
    var key = "getEquipes"
    _pendingRequests[key] = jajax({
      url: 'apiv1/sugestaoEquipes/'+date,
      type: 'GET',
      contentType: 'application/json',
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "GET_EQUIPES",
        equipes: res
      })
    })
  }

}


module.exports = OrdemServicoActions
