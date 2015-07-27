var React = require('react')

var PecaStore = require('../../stores/pecaStore')

var PecaActions = require('../../actions/pecaActions')

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
      nomePeca: '',
      marcaPeca: '',
      precoPeca: 0.0,
      quantidadePeca:0,
      descricaoPeca:''
    }
  },
	getDefaultProps: function(){
    return {
      show: false,
      onHide: function(){},
      values: [],
      onClick: function(){},
      title: "Adicionar nova peça"
    }
  },
  _handleInputChange: function(stateKey, e){
  	var newState = {}
  	newState[stateKey] = e.target.value
  	this.setState(newState)
  },
  _sendToApi: function(){
  	PecaActions.createPeca(this.state)
  	this.setState({nomePeca: '', marcaPeca: '',precoPeca: 0.0, quantidadePeca: 0, descricaoPeca:''})
  	this.props.onHide()
  },
  render: function(){
    return(
        Modal({show: this.props.show, onHide: this.props.onHide},
          ModalHeader({}, ModalTitle(), h4({}, this.props.title)),
          ModalBody({},
            Input({
              ref: 'nameInput',
               type: 'text',
               label: 'Nome da Peca',
               placeholder: 'Digite aqui o nome da peça',
               value: this.state.nomePeca,
               onChange: this._handleInputChange.bind(null, 'nomePeca')
            }),
            Input({
              ref: 'nameInput',
               type: 'text',
               label: 'Nome da marca',
               placeholder: 'Digite aqui a marca da peça',
               value: this.state.marcaPeca,
               onChange: this._handleInputChange.bind(null, 'marcaPeca')
            }),
            Input({
              ref: 'precoPeca',
               type: 'number',
               label: 'Preço da peca',
               placeholder: 'Digite aqui o preço da peca',
               value: this.state.precoPeca,
               onChange: this._handleInputChange.bind(null, 'precoPeca'),
            }),
            Input({
              ref: 'nameInput',
               type: 'number',
               label: 'Quantidade de peças',
               placeholder: 'Digite aqui a quantidade de peças',
               value: this.state.quantidadePeca,
               onChange: this._handleInputChange.bind(null, 'quantidadePeca')
            }),
            Input({
              ref: 'nameInput',
               type: 'text',
               label: 'Descrição da peça',
               placeholder: 'Digite aqui a descrição da peça',
               value: this.state.descricaoPeca,
               onChange: this._handleInputChange.bind(null, 'descricaoPeca')
            })
          ),
          ModalFooter({}, Button({onClick: this.props.onHide}, 'Fechar'), Button({onClick: this._sendToApi}, 'Adicionar'))
          )
      )
  }
})

module.exports = CreateModal