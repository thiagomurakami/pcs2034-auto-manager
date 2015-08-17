var React = require('react')
var Navigation = require('react-router').Navigation

var UsuarioStore = require('../../stores/usuarioStore')
var SessionStore = require('../../stores/sessionStore')

var UsuarioActions = require('../../actions/usuarioActions')

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
  mixins: [Navigation],
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
      tipo: 'cliente'
    }
  },
  componentDidMount: function(){
    UsuarioStore.addChangeListener("rerender", this._dataChange)
    UsuarioActions.readCliente(SessionStore.getId())
  },
  componentWillUnmount: function(){
    UsuarioStore.removeChangeListener("rerender", this._dataChange)
  },
  _dataChange: function(){
    var userData = UsuarioStore.getTableData()[0]
    this.setState({
      email: userData.email,
      senha: userData.senha,
      nome: userData.nome,
      sobrenome: userData.sobrenome,
      cpf: userData.cpf,
      estado: userData.estado,
      cidade: userData.cidade,
      cep: userData.cep,
      rua: userData.rua,
      numerorua: userData.numerorua,
      complemento: userData.complemento,
      telefone: userData.telefone,
      bairro: userData.bairro
    })
  },
  getDefaultProps: function(){
    return {
      show: false,
      data: {},
      title: "Alterar Dados Cadastrais"
    }
  },
  _handleInputChange: function(stateKey, e){
    var newState = {}
    newState[stateKey] = e.target.value
    this.setState(newState)
  },
  _sendToApi: function(){
    UsuarioActions.updateUsuario(this.state, SessionStore.getId())
    this.transitionTo('cliente')
  },
  render: function(){
    return(
      form({className: 'form-horizontal'},
        Input({
          type: 'email',
          label: 'E-mail',
          placeholder: 'Digite aqui o e-mail...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.email,
          onChange: this._handleInputChange.bind(null, 'email')
        }),
        Input({
          type: 'text',
          label: 'Senha',
          placeholder: 'Digite aqui a senha...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.senha,
          onChange: this._handleInputChange.bind(null, 'senha')
        }),
        Input({
          type: 'text',
          label: 'Nome',
          placeholder: 'Digite aqui o nome...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.nome,
          onChange: this._handleInputChange.bind(null, 'nome')
        }),
        Input({
          type: 'text',
          label: 'Sobrenome',
          placeholder: 'Digite aqui o sobrenome...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.sobrenome,
          onChange: this._handleInputChange.bind(null, 'sobrenome')
        }),
        Input({
          type: 'text',
          label: 'CPF',
          placeholder: 'Digite aqui o CPF...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.cpf,
          onChange: this._handleInputChange.bind(null, 'cpf')
        }),
        Input({
          type: 'text',
          label: 'Estado',
          placeholder: 'Digite aqui o estado...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.estado,
          onChange: this._handleInputChange.bind(null, 'estado')
        }),
        Input({
          type: 'text',
          label: 'Cidade',
          placeholder: 'Digite aqui a cidade...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.cidade,
          onChange: this._handleInputChange.bind(null, 'cidade')
        }),
        Input({
          type: 'text',
          label: 'CEP',
          placeholder: 'Digite aqui CEP...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.cep,
          onChange: this._handleInputChange.bind(null, 'cep')
        }),
        Input({
          type: 'text',
          label: 'Rua',
          placeholder: 'Digite aqui a rua...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.rua,
          onChange: this._handleInputChange.bind(null, 'rua')
        }),
        Input({
          type: 'text',
          label: 'Número Rua',
          placeholder: 'Digite aqui o número da rua...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.numerorua,
          onChange: this._handleInputChange.bind(null, 'numerorua')
        }),
        Input({
          type: 'text',
          label: 'Complemento',
          placeholder: 'Digite aqui o complemento...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.complemento,
          onChange: this._handleInputChange.bind(null, 'complemento')
        }),
        Input({
          type: 'text',
          label: 'Telefone',
          placeholder: 'Digite aqui o telefone...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.telefone,
          onChange: this._handleInputChange.bind(null, 'telefone')
        }),
        Input({
          type: 'text',
          label: 'Bairro',
          placeholder: 'Digite aqui o bairro...',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.bairro,
          onChange: this._handleInputChange.bind(null, 'bairro')
        }),
        Button({onClick: this.goBack}, 'Voltar'),
        Button({onClick: this._sendToApi}, 'Alterar')
      )
    )
  }
})

module.exports = CreateModal