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

var EquipeActions = {
  createEquipe: function(values) {
    var requestBody = {
      table: "equipeTecnico",
      values: values
    }
    var key = "createEquipe"
    _pendingRequests[key] = jajax({
      url: 'apiv1/create',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeEquipe"
      })
    })
  },
  readEquipe: function(){
    var requestBody = {
      table: "equipeTecnico"
    }
    var key = "readEquipe"
    _pendingRequests[key] = jajax({
      url: 'apiv1/read',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "readEquipe",
        rows: res
      })
    })
  },
  updateEquipe: function(values, id){
    values.idequipe = id
    var requestBody = {
      table: "equipeTecnico",
      values: values
    }
    var key = "updateEquipe"
    _pendingRequests[key] = jajax({
      url: 'apiv1/update',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeEquipe"
      })
    })

  },
  deleteEquipe: function(id){
    var values = {}
    values.idequipe = id
    var requestBody = {
      table: "equipeTecnico",
      values: values
    }
    var key = "deleteEquipe"
    _pendingRequests[key] = jajax({
      url: 'apiv1/delete',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeEquipe"
      })
    })
  }
}


module.exports = EquipeActions
