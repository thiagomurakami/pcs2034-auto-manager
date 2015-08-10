var React = require('react')

var PecaStore = require('../../../stores/pecaStore')

var PecaActions = require('../../../actions/pecaActions')

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

var CreateModal = React.createClass({
  getInitialState: function(){
    return {
      nome: '',
      marca: '',
      preco: 0,
      quantidade: 0,
      descricao: ''
    }
  },
  getDefaultProps: function(){
    return {
      show: false,
      onHide: function(){},
      values: [],
      onClick: function(){},
      title: "Adicionar Peça"
    }
  },
  _handleInputChange: function(stateKey, e){
    var newState = {}
    newState[stateKey] = e.target.value
    this.setState(newState)
  },
  _sendToApi: function(){
    PecaActions.createPeca(this.state)
    this.setState({
      nome: '',
      marca: '',
      preco: 0,
      quantidade: 0,
      descricao: ''
    })
    this.props.onHide()
  },
  render: function(){
    return(
      Modal({show: this.props.show, onHide: this.props.onHide},
        ModalHeader({}, ModalTitle(), h4({}, this.props.title)),
        ModalBody({},
          Input({
            type: 'text',
            label: 'Nome da Peça',
            placeholder: 'Digite aqui o nome da peça...',
            value: this.state.nome,
            onChange: this._handleInputChange.bind(null, 'nome')
          }),
          Input({
            type: 'number',
            label: 'Preço da Peça',
            placeholder: 'Digite aqui o preço da peça',
            value: this.state.preco,
            onChange: this._handleInputChange.bind(null, 'preco')
          }),
          Input({
            type: 'text',
            label: 'Marca da Peça',
            placeholder: 'Digite aqui a marca da peça',
            value: this.state.marca,
            onChange: this._handleInputChange.bind(null, 'marca')
          }),
          Input({
            type: 'text',
            label: 'Quantidade de Peça',
            placeholder: 'Digite aqui a quantidade de peças',
            value: this.state.quantidade,
            onChange: this._handleInputChange.bind(null, 'quantidade')
          }),
          Input({
            type: 'textarea',
            label: 'Descrição da Peça',
            placeholder: 'Digite aqui a descrição da peça',
            value: this.state.descricao,
            onChange: this._handleInputChange.bind(null, 'descricao')
          })
        ),
        ModalFooter({}, Button({onClick: this.props.onHide}, 'Fechar'), Button({onClick: this._sendToApi}, 'Adicionar'))
      )
    )
  }
})

module.exports = CreateModal
