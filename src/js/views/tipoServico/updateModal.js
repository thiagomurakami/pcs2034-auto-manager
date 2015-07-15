var React = require('react')

var TipoDeServicoStore = require('../../stores/tipoDeServicoStore')

var TipoDeServicoActions = require('../../actions/tipoDeServicoActions')

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
      nomeServico: '',
      precoServico: ''
    }
  },
  componentWillReceiveProps: function(){
    console.log('componentWillMount')
    this.setState({nomeServico: this.props.data.nome, precoServico: this.props.data.preco})
  },
	getDefaultProps: function(){
    return {
      show: false,
      onHide: function(){},
      data: {},
      index: 0,
      onClick: function(){},
      title: "Alterar Tipo de Serviço"
    }
  },
  _handleInputChange: function(stateKey, e){
  	var newState = {}
  	newState[stateKey] = e.target.value
  	this.setState(newState)
  },
  _sendToApi: function(){
  	TipoDeServicoActions.updateTipoDeServico(this.state, this.props.index)
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
               label: 'Nome do Serviço',
               placeholder: 'Digite aqui o nome do serviço...',
               value: this.state.nomeServico,
               onChange: this._handleInputChange.bind(null, 'nomeServico')
            }),
            Input({
              ref: 'precoServico',
               type: 'number',
               label: 'Preço do Serviço',
               placeholder: 'Digite aqui o preço do serviço',
               value: this.state.precoServico,
               onChange: this._handleInputChange.bind(null, 'precoServico')
            })
          ),
          ModalFooter({}, Button({onClick: this.props.onHide}, 'Fechar'), Button({onClick: this._sendToApi}, 'Alterar'))
          )
      )
  }
})

module.exports = CreateModal