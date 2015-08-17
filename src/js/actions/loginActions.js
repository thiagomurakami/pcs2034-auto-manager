var jajax = require('jquery').ajax
var u = require('underscore')
var AppDispatcher = require('../dispatcher/dispatcher')
var LoginConstants = require('../constants/LoginConstants')

var _pendingRequests = {}

function abortPendingRequestsIfPending(key){
  if(_pendingRequests[key]){
    if(_pendingRequests[key].readyState != 4){
      _pendingRequests[key].abort()
    }
  }
}

var loginActions = {
  login: function(loginObj) {
    var key = 'login'
    _pendingRequests[key] = jajax({
      type: 'POST',
      url: '/login',
      data: JSON.stringify({
        email: loginObj.email,
        senha: loginObj.senha
      }),
      contentType: 'application/json'
    })
    .done(function(res){
      if(res.err){
        AppDispatcher.dispatch({
        action: LoginConstants.LOGIN_FAILURE,
        value: res.err
        })
      }
      else{
        AppDispatcher.dispatch({
        action: LoginConstants.LOGIN,
        value: { 
          loginData: res.data,
          nextPath: loginObj.nextPath
        }
      })
      }
      
    })
    .fail(function(errMsg){
      console.log("login fail")
      AppDispatcher.dispatch({
        action: LoginConstants.LOGIN_FAILURE,
        value: errMsg
      })
    })
  },
  logout: function(){
    AppDispatcher.dispatch({
      action: LoginConstants.LOGOUT
    })
  }
}


module.exports = loginActions
