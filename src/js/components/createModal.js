var React                         = require('react')
var jajax 						  = require('jquery').ajax

// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var Button = React.createFactory(require('react-bootstrap').Button)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var Modal = React.createFactory(require('react-bootstrap').Modal)
var ModalHeader = React.createFactory(require('react-bootstrap').Modal.Header)
var ModalBody = React.createFactory(require('react-bootstrap').Modal.Body)
var ModalFooter = React.createFactory(require('react-bootstrap').Modal.Footer)
var ModalTitle = React.createFactory(require('react-bootstrap').Modal.Title)
var div = React.createFactory('div')
var p = React.createFactory('p')
var form = React.createFactory('form')
var input = React.createFactory('input')

var _pendingRequests = {}

var CreateModal = React.createClass({
  getInitialState: function(){
    return {
      nomeServico: '',
      precoServico: ''
    }
  },
	getDefaultProps: function(){
    return {
      show: false,
      onHide: function(){},
      values: [],
      onClick: function(){},
      title: "Title"
    }
  },
  render: function(){
    return(
        Modal({show: this.props.show, onHide: this.props.onHide},
          ModalHeader({}, ModalTitle(), this.props.title),
          ModalBody({}, form({onSubmit: this._sendToApi},
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
          ),
          ModalFooter({}, Button({onClick: this.props.onHide}, 'Fechar'), Button({onClick: this._submit}, 'Adicionar'))
          )
      )
  }
})

module.exports = CreateModal