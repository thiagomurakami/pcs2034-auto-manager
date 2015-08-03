var React = require('react')

var VeiculoStore = require('../../../stores/veiculoStore')

var VeiculoActions = require('../../../actions/veiculoAction')

var Modal = React.createFactory(require('react-bootstrap').Modal)
var ModalHeader = React.createFactory(require('react-bootstrap').Modal.Header)
var ModalBody = React.createFactory(require('react-bootstrap').Modal.Body)
var ModalFooter = React.createFactory(require('react-bootstrap').Modal.Footer)
var ModalTitle = React.createFactory(require('react-bootstrap').Modal.Title)

var Button = React.createFactory(require('react-bootstrap').Button)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var Input = React.createFactory(require('react-bootstrap').Input)

var div = React.createFactory('div')
var h4 = React.createFactory('h4')
var form = React.createFactory('form')
var thead = React.createFactory('thead')
var table = React.createFactory('table')
var tbody = React.createFactory('tbody')
var th = React.createFactory('th')
var td = React.createFactory('td')
var tr = React.createFactory('tr')
var span = React.createFactory('span')
var option = React.createFactory('option')

var CreateModal = React.createClass({
  getInitialState: function(){
    return {
      placa: '',
      renavam: '',
      fabricante: '',
      modelo: '',
      ano: '',
      dono: ''
    }
  },
  getDefaultProps: function(){
    return {
      show: false,
      onHide: function(){},
      values: [],
      onClick: function(){},
      title: "Adicionar Veículo"
    }
  },
  _handleInputChange: function(stateKey, e){
    var newState = {}
    newState[stateKey] = e.target.value
    this.setState(newState)
  },
  _sendToApi: function(){
    VeiculoActions.createVeiculo(this.state)
    this.setState({
      placa: '',
      renavam: '',
      fabricante: '',
      modelo: '',
      ano: '',
      dono: ''
    })
    this.props.onHide()
  },
  render: function(){
    var listaClientes = VeiculoStore.getListaClientes().map(function(cliente, index){
      var label = cliente.codigocadastro+"- "+cliente.nome+" "+cliente.sobrenome
      return option({key: "dono-"+cliente.codigocadastro, value: cliente.codigocadastro}, label)
    })
    return(
      Modal({show: this.props.show, onHide: this.props.onHide},
        ModalHeader({}, ModalTitle(), h4({}, this.props.title)),
        ModalBody({},
          Input({
            type: 'text',
            label: 'Placa',
            placeholder: 'Digite aqui a placa...',
            value: this.state.placa,
            onChange: this._handleInputChange.bind(null, 'placa')
          }),
          Input({
            type: 'text',
            label: 'Renavam',
            placeholder: 'Digite aqui o renavam...',
            value: this.state.renavam,
            onChange: this._handleInputChange.bind(null, 'renavam')
          }),
          Input({
            type: 'text',
            label: 'Fabricante',
            placeholder: 'Digite aqui o fabricante...',
            value: this.state.fabricante,
            onChange: this._handleInputChange.bind(null, 'fabricante')
          }),
          Input({
            type: 'text',
            label: 'Modelo',
            placeholder: 'Digite aqui o modelo...',
            value: this.state.modelo,
            onChange: this._handleInputChange.bind(null, 'modelo')
          }),
          Input({
            type: 'text',
            label: 'Ano',
            placeholder: 'Digite aqui o ano...',
            value: this.state.ano,
            onChange: this._handleInputChange.bind(null, 'ano')
          }),
          Input({
              type: 'select',
              label: 'Dono',
              value: this.state.dono,
              onChange: this._handleInputChange.bind(null, 'dono')
            },
            listaClientes
          )
        ),
        ModalFooter({}, Button({onClick: this.props.onHide}, 'Fechar'), Button({onClick: this._sendToApi}, 'Adicionar'))
      )
    )
  }
})

module.exports = CreateModal
