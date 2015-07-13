var React                         = require('react')
var jajax 						  = require('jquery').ajax

// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var div = React.createFactory('div')
var p = React.createFactory('p')
var form = React.createFactory('form')
var input = React.createFactory('input')

var Example = React.createClass({
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
  	var nome = this.refs.nameInput.getValue()
  	var senha = this.refs.passwordInput.getValue()
  	var email = this.refs.emailInput.getValue()
  	console.log("Nome: "+nome)
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
        	  	ref: 'nameInput',
        	  	 type: 'text',
        	  	 label: 'Nome',
        	  	 placeholder: 'Nome',
        	  	 value: this.state.name,
        	  	 onChange: this._handleChange
        	  }),
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
        	  ButtonInput({
        	  	type: 'submit',
        	  	value: 'Enviar',
        	  })
        	)
      )
  }
})

module.exports = Example