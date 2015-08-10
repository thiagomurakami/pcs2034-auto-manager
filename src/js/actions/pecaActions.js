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

var PecaStore = {
  createPeca: function(values) {
    var requestBody = {
      table: "peca",
      values: values
    }
    var key = "createPeca"
    _pendingRequests[key] = jajax({
      url: 'apiv1/create',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changePeca"
      })
    })
  },
  readPeca: function(){
    var requestBody = {
      table: "peca"
    }
    var key = "readPeca"
    _pendingRequests[key] = jajax({
      url: 'apiv1/read',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "readPeca",
        rows: res
      })
    })
  },
  updatePeca: function(values, id){
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
        actionType: "changePeca"
      })
    })

  },
  deletePeca: function(id){
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
        actionType: "changePeca"
      })
    })
  }
}


module.exports = PecaStore
