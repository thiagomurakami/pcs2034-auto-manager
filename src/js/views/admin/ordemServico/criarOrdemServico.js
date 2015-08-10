var React                = require('react')
var jquery 						  = require('jquery')
var jajax 						  = require('jquery').ajax
var Navigation          = require('react-router').Navigation;

// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var div = React.createFactory('div')
var p = React.createFactory('p')
var form = React.createFactory('form')
var input = React.createFactory('input')


var CriarOrdemServico = React.createClass({
  mixins: [Navigation],
  getInitialState: function(){
    return({
      nome: '',
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
      senha: '',
      cpf: '',
      tipo: 'cliente'
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

  },
  render: function(){
    return(
      form({onSubmit: this._sendToApi},
        Input({
          ref: 'nomeInput',
          type: 'text',
          label: 'Nome',
          placeholder: 'Nome',
          value: this.state.nome,
          onChange: this._handleInputChange.bind(null, 'nome')
        }),
        Input({
          ref: 'sobrenomeInput',
          type: 'text',
          label: 'Sobrenome',
          placeholder: 'Sobrenome',
          value: this.state.sobrenome,
          onChange: this._handleInputChange.bind(null, 'sobrenome')
        })
      )
    )
  }
})

module.exports = CriarOrdemServico