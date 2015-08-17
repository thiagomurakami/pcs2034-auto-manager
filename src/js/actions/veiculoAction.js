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

var VeiculoActions = {
  createVeiculo: function(values) {
    var requestBody = {
      table: "veiculo",
      values: values
    }
    var key = "createVeciulo"
    _pendingRequests[key] = jajax({
      url: 'apiv1/create',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeVeiculo"
      })
    })
  },
  readVeiculo: function(){
    var requestBody = {
      table: "veiculo"
    }
    var key = "readVeiculo"
    _pendingRequests[key] = jajax({
      url: 'apiv1/read',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      console.log(res)
      AppDispatcher.dispatch({
        actionType: "readVeiculo",
        rows: res
      })
    })
  },
  updateVeiculo: function(values, id){
    values.dono = id
    var requestBody = {
      table: "veiculo",
      values: values
    }
    var key = "updateVeiculo"
    _pendingRequests[key] = jajax({
      url: 'apiv1/update',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      console.log('done')
      AppDispatcher.dispatch({
        actionType: "changeVeiculo",
      })
    })

  },
  deleteVeiculo: function(placa){
    var values = {}
    values.placa = placa
    var requestBody = {
      table: "veiculo",
      values: values
    }
    var key = "deleteVeiculo"
    _pendingRequests[key] = jajax({
      url: 'apiv1/delete',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeVeiculo"
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
  }
}


module.exports = VeiculoActions
