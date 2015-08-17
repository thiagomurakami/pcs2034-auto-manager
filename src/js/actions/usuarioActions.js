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

var UsuarioActions = {
  createUsuario: function(values) {
    var requestBody = {
      table: "usuario",
      values: values
    }
    var key = "createUsuario"
    _pendingRequests[key] = jajax({
      url: 'apiv1/create',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeUsuario"
      })
    })
  },
  readUsuario: function(){
    var requestBody = {
      table: "usuario",
    }
    var key = "readUsuario"
    _pendingRequests[key] = jajax({
      url: 'apiv1/read',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "readUsuario",
        rows: res
      })
    })
  },
  updateUsuario: function(values, id){
    values.codigocadastro = id
    var requestBody = {
      table: "usuario",
      values: values
    }
    var key = "updateUsuario"
    _pendingRequests[key] = jajax({
      url: 'apiv1/update',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeUsuario"
      })
    })

  },
  deleteUsuario: function(id){
    var values = {}
    values.codigocadastro = id
    var requestBody = {
      table: "usuario",
      values: values
    }
    var key = "deleteUsuario"
    _pendingRequests[key] = jajax({
      url: 'apiv1/delete',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeUsuario"
      })
    })
  },
  readCliente: function(id){
    var requestBody = {
      table: "usuario",
      id: id
    }
    var key = "readUsuario"
    _pendingRequests[key] = jajax({
      url: 'apiv1/read/clienteDados',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "readUsuario",
        rows: res
      })
    })
  }
}


module.exports = UsuarioActions
