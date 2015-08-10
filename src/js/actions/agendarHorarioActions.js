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

var AgendarHorarioActions = {
  createAgendarHorario: function(values) {
    var requestBody = {
      table: "horarioCliente",
      values: values
    }
    var key = "createAgendarHorario"
    _pendingRequests[key] = jajax({
      url: 'apiv1/create',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeAgendarHorario"
      })
    })
  },
  readAgendarHorario: function(){
    var requestBody = {
      table: "horarioCliente"
    }
    var key = "readAgendarHorario"
    _pendingRequests[key] = jajax({
      url: 'apiv1/read',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "readAgendarHorario",
        rows: res
      })
    })
  },
  updateAgendarHorario: function(values, oldValues){
    var requestBody = {
      table: "horarioCliente",
      values: {newValues: values, oldValues: oldValues}
    }
    var key = "updateAgendarHorario"
    _pendingRequests[key] = jajax({
      url: 'apiv1/update',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      console.log('done')
      AppDispatcher.dispatch({
        actionType: "changeAgendarHorario"
      })
    })

  },
  deleteAgendarHorario: function(values){
    var requestBody = {
      table: "horarioCliente",
      values: values
    }
    var key = "deleteAgendarHorario"
    _pendingRequests[key] = jajax({
      url: 'apiv1/delete',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "changeAgendarHorario"
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
  getGerentes: function(){
    var key = "getGerentes"
    _pendingRequests[key] = jajax({
      url: 'apiv1/gerentes',
      type: 'GET',
      contentType: 'application/json',
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "GET_GERENTES",
        gerentes: res
      })
    })
  },
  getHorariosDisponiveis: function(date){
    var key = "getClientes"
    var uri = 'apiv1/horarios/'+date
    _pendingRequests[key] = jajax({
      url: uri,
      type: 'GET',
      contentType: 'application/json',
      // data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      AppDispatcher.dispatch({
        actionType: "GET_HORARIOS",
        horarios: res
      })
    }.bind(this))
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
  }
}


module.exports = AgendarHorarioActions
