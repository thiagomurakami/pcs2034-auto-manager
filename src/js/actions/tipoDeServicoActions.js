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

var TipoDeServicoActions = {
  createTipoDeServico: function(values) {
    var requestBody = {
      table: "tipoServico",
      values: values
    }
    var key = "createTipoDeServico"
    _pendingRequests[key] = jajax({
        url: 'apiv1/create',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestBody),
        async: true
      }).done(function(res){
        console.log('done')
      })
    AppDispatcher.dispatch({
      actionType: "changeTipoDeServico",
    })
  },
  readTipoDeServico: function(){
    var requestBody = {
      table: "tipoServico",
    }
    var key = "createTipoDeServico"
    _pendingRequests[key] = jajax({
        url: 'apiv1/read',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestBody),
        async: true
      }).done(function(res){
        console.log(res)
        AppDispatcher.dispatch({
          actionType: "readTipoDeServico",
          rows: res
        })
      })
  },
  updateTipoDeServico: function(values, id){
    values.id = id
    var requestBody = {
      table: "tipoServico",
      values: values
    }
    var key = "createTipoDeServico"
    _pendingRequests[key] = jajax({
        url: 'apiv1/update',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestBody),
        async: true
      }).done(function(res){
        console.log('done')
        AppDispatcher.dispatch({
          actionType: "changeTipoDeServico",
        })
      })
    
  },
  deleteTipoDeServico: function(id){
    AppDispatcher.dispatch({
      actionType: "changeTipoDeServico"
    })
  }
}


module.exports = TipoDeServicoActions
