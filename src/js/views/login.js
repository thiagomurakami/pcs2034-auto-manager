var React                         = require('react')
var jajax 						  = require('jquery').ajax

var LoginActions = require('../actions/loginActions')
var Navigation = require('react-router').Navigation;
// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var ButtonToolbar = React.createFactory(require('react-bootstrap').ButtonToolbar)
var ButtonGroup = React.createFactory(require('react-bootstrap').ButtonGroup)
var div = React.createFactory('div')
var p = React.createFactory('p')
var form = React.createFactory('form')
var input = React.createFactory('input')

var Login = React.createClass({
  mixins: [Navigation],
	getInitialState: function(){
		return({
			email: '',
      password: ''
		})
	},
	interceptEvent: function(event){
    if(event){
      if(event.preventDefault) event.preventDefault()
        if(event.stopPropagation) event.stopPropagation()
      }
  },

  _login: function(e){
  	this.interceptEvent(e)
    var loginObj = {}
    loginObj.email = this.refs.emailInput.getValue()
    loginObj.senha = this.refs.passwordInput.getValue()
    loginObj.nextPath = this.props.query.nextPath
    LoginActions.login(loginObj)
  },

  render: function(){
    return(
      form({onSubmit: this._login},
       Input({
        ref: 'emailInput',
        type: 'email',
        label: 'Email',
        placeholder: 'Digite seu email',
      }),
       Input({
        ref: 'passwordInput',
        type: 'password',
        label: 'Senha',
        placeholder: 'Digite sua senha',
      }),
       // ButtonToolbar({},
        ButtonInput({
          type: 'submit',
          value: 'Entrar'
        }),
        ButtonInput({
          value: 'Cadastre-se',
          onClick: this.transitionTo.bind(null, 'cadastro')
        })
        // )
       )
      )
  }
})

module.exports = Login