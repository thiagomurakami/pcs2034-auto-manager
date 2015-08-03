var EventEmitter = require('events').EventEmitter
var assign = require('object-assign')

var AppDispatcher = require('../dispatcher/dispatcher.js')

var LoginConstants = require('../constants/LoginConstants.js')

var RouterContainer = require('../services/routerContainer')

_state = {
  id: null,
  authenticated: false,
  tipo: null,
  error: {
    code: false,
    message: false,
    body: false
  },
  appPage: 'login'
}

function validateLogin(loginData){
  _state.id = loginData.codigocadastro
  _state.authenticated = true
  _state.tipo = loginData.tipo
  _state.email = loginData.email
  RouterContainer.get().transitionTo('/'+_state.tipo)

}

function loginError(errMsg){
  _state.error.code = -1
  _state.error.message = "Could not connect to server"
}

function changeAppPage(goToPage){
  if(goToPage){
    _state.appPage = goToPage
  }
}

function logout(){
  _state = {
      id: null,
      authenticated: false,
      tipo: null,
      error: {
        code: false,
        message: false,
        body: false
      }
  }

  RouterContainer.get().transitionTo('/login');
}

var SessionStore = assign({}, EventEmitter.prototype, {
  emitChange: function(eventString){
    this.emit(eventString)
  },

  addChangeListener: function(eventString, callback){
    this.on(eventString, callback)
  },

  removeChangeListener: function(eventString, callback){
    this.removeListener(eventString, callback)
  },

  getState: function(){
    return _state
  },

  isLoggedIn: function(){
    return _state.authenticated
  },

  getUser: function(){
    return _state.user
  },

  getUserEmail: function(){
    return _state.email
  },

  dispatcherIndex: AppDispatcher.register(function(payload){
    switch(payload.action){
      case LoginConstants.LOGIN:
        _state.authenticated = true
        console.log(payload)
        RouterContainer.get().transitionTo(payload.value.nextPath);
         validateLogin(payload.value.loginData)
        SessionStore.emitChange()
        break
      case LoginConstants.LOGIN_FAILURE:
        loginError(payload.value)
        SessionStore.emitChange()
        break
      case LoginConstants.CHANGE_APP_PAGE:
        //did not work AppDispatcher.waitFor([CreateCampaignIdAndTypeStore.dispatcherIndex])
        changeAppPage(payload.value)
        SessionStore.emitChange()
        break
      case LoginConstants.LOGOUT:
        logout()
        SessionStore.emitChange()
        break
    }
  })
})

module.exports = SessionStore
