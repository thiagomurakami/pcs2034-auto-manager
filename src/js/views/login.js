var React                         = require('react')
var jajax 						  = require('jquery').ajax

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
	getInitialState: function(){
		return({
			name: 'Koji'
		})
	},
	interceptEvent: function(event){
    if(event){
      if(event.preventDefault) event.preventDefault()
        if(event.stopPropagation) event.stopPropagation()
      }
  },

  _log: function(e){
  	this.interceptEvent(e)
  	var senha = this.refs.passwordInput.getValue()
  	var email = this.refs.emailInput.getValue()
  	console.log("senha: "+senha)
  	console.log("email: "+email)
  },
  _handleChange: function(e){
  	this.setState({name: e.target.value})
  },

  render: function(){
    return(
      form({onSubmit: this._log},
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
          value: 'Enviar',
        }),
        ButtonInput({
          value: 'Cadastre-se'
        })
        // )
       )
      )
  }
})

module.exports = Login