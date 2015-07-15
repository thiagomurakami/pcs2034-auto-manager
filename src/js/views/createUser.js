var React                         = require('react')
var jajax 						  = require('jquery').ajax

// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var div = React.createFactory('div')
var p = React.createFactory('p')
var form = React.createFactory('form')
var input = React.createFactory('input')

var _pendingRequests = {}

var Example = React.createClass({
	getInitialState: function(){
		return({
			name: '',
			sobrenome: '',
			estado: '',
			cidade: '',
			cep: '',
			rua: '',
			numeroRua: '',
			complemento: '',
			telefone: '',
			email: '',
			bairro: '',
			senha: ''
		})
	},
	interceptEvent: function(event){
    if(event){
      if(event.preventDefault) event.preventDefault()
      if(event.stopPropagation) event.stopPropagation()
  	}
    },

  _handleInputChange: function(stateKey, e){
  	var newState = {}
  	newState[stateKey] = e.target.value
  	this.setState(newState)
  },
  _cepInput: function(e){
  	// console.log(e)

  	var uri = '/apiv1/cep/'+this.refs.cep.getValue()
  	var key = 'getCep'
  	if(this.state.cep !== this.refs.cep.getValue() || this.state.rua ==''){
  		this.setState({cep: this.refs.cep.getValue()})
  		_pendingRequests[key] = jajax({
        url: uri,
        type: 'GET',
        contentType: 'application/json',
        async: true
      }).done(function(res){
      	var endObj = JSON.parse(res)
      	this.setState({
      		estado: endObj.estado,
      		rua: endObj.logradouro,
      		bairro: endObj.bairro,
      		cidade: endObj.cidade
      	})
      }.bind(this))
  	}
  },
  _sendToApi: function(e){
  	this.interceptEvent(e)
  	console.log(this.state)
  	var key = "sendToApi"
  	_pendingRequests[key] = jajax({
        url: 'apiv1/create',
        type: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(this.state),
        async: true
      }).done(function(res){
      	console.log('done')
      }.bind(this))
  },
  render: function(){
    return(
        form({onSubmit: this._sendToApi},
        	  Input({
        	  	ref: 'nameInput',
        	  	 type: 'text',
        	  	 label: 'Nome',
        	  	 placeholder: 'Nome',
        	  	 value: this.state.name,
        	  	 onChange: this._handleInputChange.bind(null, 'name')
        	  }),
        	  Input({
        	  	ref: 'sobrenomeInput',
        	  	 type: 'text',
        	  	 label: 'Sobrenome',
        	  	 placeholder: 'Sobrenome',
        	  	 value: this.state.sobrenome,
        	  	 onChange: this._handleInputChange.bind(null, 'sobrenome')
        	  }),
        	  Input({
        	  	ref: 'emailInput',
        	  	 type: 'email',
        	  	 label: 'Email',
        	  	 placeholder: 'Digite seu email',
        	  	 value: this.state.email,
        	  	 onChange: this._handleInputChange.bind(null, 'email')
        	  }),
        	  Input({
        	  	ref: 'passwordInput',
        	  	 type: 'password',
        	  	 label: 'Senha',
        	  	 placeholder: 'Digite sua senha',
        	  	 value: this.state.senha,
        	  	 onChange: this._handleInputChange.bind(null, 'senha')
        	  }),
        	  Input({
        	  	ref: 'cep',
        	  	 type: 'text',
        	  	 label: 'CEP',
        	  	 placeholder: 'Entre seu CEP',
        	  	 onBlur: this._cepInput,
        	  }),
        	  Input({
        	  	ref: 'rua',
        	  	 type: 'text',
        	  	 label: 'Endereço',
        	  	 placeholder: '',
        	  	 disabled: true,
        	  	 value: this.state.rua
        	  }),
        	  Input({
        	  	ref: 'bairro',
        	  	 type: 'text',
        	  	 label: 'Bairro',
        	  	 placeholder: '',
        	  	 disabled: true,
        	  	 value: this.state.bairro
        	  }),
        	  Input({
        	  	ref: 'numeroRua',
        	  	 type: 'text',
        	  	 label: 'Número',
        	  	 placeholder: '',
        	  	 value: this.state.numeroRua,
        	  	 disabled: false,
        	  	 onChange: this._handleInputChange.bind(null, 'numeroRua')
        	  }),
        	  Input({
        	  	ref: 'cidade',
        	  	 type: 'text',
        	  	 label: 'Cidade',
        	  	 placeholder: '',
        	  	 value: this.state.cidade,
        	  	 disabled: true
        	  }),
        	  Input({
        	  	ref: 'estado',
        	  	 type: 'text',
        	  	 label: 'Estado',
        	  	 placeholder: '',
        	  	 value: this.state.estado,
        	  	 disabled: true,
        	  	 isLoading: true
        	  }),
        	  Input({
        	  	ref: 'complemento',
        	  	 type: 'text',
        	  	 label: 'Complemento',
        	  	 value: this.state.complemento,
        	  	 onChange: this._handleInputChange.bind(null, 'complemento')
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