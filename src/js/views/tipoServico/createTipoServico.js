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
			nomeServico: '',
      precoServico: 0
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
  _sendToApi: function(e){
  	this.interceptEvent(e)
  	console.log(this.state)
    var requestBody = {
      table: "tipoServico",
      values: this.state
    }
  	var key = "sendToApi"
  	_pendingRequests[key] = jajax({
        url: 'apiv1/create',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(requestBody),
        async: true
      }).done(function(res){
      	console.log('done')
      })
  },
  render: function(){
    return(
        form({onSubmit: this._sendToApi},
        	  Input({
        	  	ref: 'nameInput',
        	  	 type: 'text',
        	  	 label: 'Nome do Serviço',
        	  	 placeholder: 'Digite aqui o nome do serviço...',
        	  	 value: this.state.nomeServico,
        	  	 onChange: this._handleInputChange.bind(null, 'nomeServico')
        	  }),
        	  Input({
        	  	ref: 'precoServico',
        	  	 type: 'text',
        	  	 label: 'Preço do Serviço',
        	  	 placeholder: 'Digite aqui o preço do serviço',
        	  	 value: this.state.precoServico,
        	  	 onChange: this._handleInputChange.bind(null, 'precoServico')
        	  }),
        	  ButtonInput({
        	  	type: 'submit',
        	  	value: 'Criar tipo de serviço',
        	  })
        	)
      )
  }
})

module.exports = Example