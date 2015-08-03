var React = require('react')

var UsuarioStore = require('../../../stores/usuarioStore')

var UsuarioActions = require('../../../actions/usuarioActions')

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
      email: '',
      senha: '',
      nome: '',
      sobrenome: '',
      cpf: '',
      estado: '',
      cidade: '',
      cep: '',
      rua: '',
      numerorua: '',
      complemento: '',
      telefone: '',
      bairro: '',
      tipo: '',
      especialidade: ''
    }
  },
  componentWillReceiveProps: function(newProps){
    var newState = {}
    for(var key in this.state){
      newState[key] = newProps.data[key]
    }
    this.setState(newState)
  },
	getDefaultProps: function(){
    return {
      show: false,
      onHide: function(){},
      data: {},
      index: 0,
      onClick: function(){},
      title: "Alterar Usuário"
    }
  },
  _handleInputChange: function(stateKey, e){
  	var newState = {}
  	newState[stateKey] = e.target.value
  	this.setState(newState)
  },
  _sendToApi: function(){
    UsuarioActions.updateUsuario(this.state, this.props.index)
  	this.props.onHide()
  },
  render: function(){
    return(
        Modal({show: this.props.show, onHide: this.props.onHide},
          ModalHeader({}, ModalTitle(), h4({}, this.props.title)),
          ModalBody({},
            Input({
              type: 'email',
              label: 'E-mail',
              placeholder: 'Digite aqui o e-mail...',
              value: this.state.email,
              onChange: this._handleInputChange.bind(null, 'email')
            }),
            Input({
              type: 'text',
              label: 'Senha',
              placeholder: 'Digite aqui o nome do serviço...',
              value: this.state.senha,
              onChange: this._handleInputChange.bind(null, 'senha')
            }),
            Input({
              type: 'text',
              label: 'Nome',
              placeholder: 'Digite aqui o nome...',
              value: this.state.nome,
              onChange: this._handleInputChange.bind(null, 'nome')
            }),
            Input({
              type: 'text',
              label: 'Sobrenome',
              placeholder: 'Digite aqui o sobrenome...',
              value: this.state.sobrenome,
              onChange: this._handleInputChange.bind(null, 'sobrenome')
            }),
            Input({
              type: 'text',
              label: 'CPF',
              placeholder: 'Digite aqui o CPF...',
              value: this.state.cpf,
              onChange: this._handleInputChange.bind(null, 'cpf')
            }),
            Input({
              type: 'text',
              label: 'Estado',
              placeholder: 'Digite aqui o estado...',
              value: this.state.estado,
              onChange: this._handleInputChange.bind(null, 'estado')
            }),
            Input({
              type: 'text',
              label: 'Cidade',
              placeholder: 'Digite aqui a cidade...',
              value: this.state.cidade,
              onChange: this._handleInputChange.bind(null, 'cidade')
            }),
            Input({
              type: 'text',
              label: 'CEP',
              placeholder: 'Digite aqui CEP...',
              value: this.state.cep,
              onChange: this._handleInputChange.bind(null, 'cep')
            }),
            Input({
              type: 'text',
              label: 'Rua',
              placeholder: 'Digite aqui a rua...',
              value: this.state.rua,
              onChange: this._handleInputChange.bind(null, 'rua')
            }),
            Input({
              type: 'text',
              label: 'Número Rua',
              placeholder: 'Digite aqui o número da rua...',
              value: this.state.numerorua,
              onChange: this._handleInputChange.bind(null, 'numerorua')
            }),
            Input({
              type: 'text',
              label: 'Complemento',
              placeholder: 'Digite aqui o complemento...',
              value: this.state.complemento,
              onChange: this._handleInputChange.bind(null, 'complemento')
            }),
            Input({
              type: 'text',
              label: 'Telefone',
              placeholder: 'Digite aqui o telefone...',
              value: this.state.telefone,
              onChange: this._handleInputChange.bind(null, 'telefone')
            }),
            Input({
              type: 'text',
              label: 'Bairro',
              placeholder: 'Digite aqui o bairro...',
              value: this.state.bairro,
              onChange: this._handleInputChange.bind(null, 'bairro')
            }),
            Input({
                type: 'select',
                label: 'Tipo Usuário',
                value: this.state.tipo,
                onChange: this._handleInputChange.bind(null, 'tipo')
              }, option({value: 'admin'}, 'Administrador'),
              option({value: 'gerente'}, 'Gerente Técnico'),
              option({value: 'cliente'}, 'Cliente'),
              option({value: 'tecnico'}, 'Técnico'),
              option({value: 'atendente'}, 'Atendente')
            ),
            Input({
              type: 'text',
              label: 'Especialidade',
              placeholder: 'Digite aqui o especialidade...',
              value: this.state.especialidade,
              onChange: this._handleInputChange.bind(null, 'especialidade')
            })
          ),
          ModalFooter({}, Button({onClick: this.props.onHide}, 'Fechar'), Button({onClick: this._sendToApi}, 'Alterar'))
          )
      )
  }
})

module.exports = CreateModal