var React                         = require('react')
var jajax 						  = require('jquery').ajax

var LoginActions = require('../actions/loginActions')
var SessionStore = require('../stores/sessionStore')
var Navigation = require('react-router').Navigation;
// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var ButtonToolbar = React.createFactory(require('react-bootstrap').ButtonToolbar)
var ButtonGroup = React.createFactory(require('react-bootstrap').ButtonGroup)
var div = React.createFactory('div')
var p = React.createFactory('p')
var h2 = React.createFactory('h2')
var form = React.createFactory('form')
var input = React.createFactory('input')

var Login = React.createClass({
  mixins: [Navigation],
  getInitialState: function(){
    return({
      email: '',
      password: '',
      error: SessionStore.getState().error
    })
  },
  componentDidMount: function(){
    SessionStore.addChangeListener('login', this._error)
  },
  componentWillUnmount: function(){
    SessionStore.removeChangeListener('login', this._error)
  },
  _error: function(){
    this.setState({error: SessionStore.getState().error})
  },
  interceptEvent: function(event){
    if(event){
      if(event.preventDefault) event.preventDefault()
      if(event.stopPropagation) event.stopPropagation()
    }
  },

  _login: function(e){
    this.interceptEvent(e)
    var loginObj = {}
    loginObj.email = this.refs.emailInput.getValue()
    loginObj.senha = this.refs.passwordInput.getValue()
    loginObj.nextPath = this.props.query.nextPath
    LoginActions.login(loginObj)
  },

  render: function(){
    console.log(this.state.error)
    var errorMsg = this.state.error.message ? p({}, this.state.error.message) : null
    return(
      form({onSubmit: this._login, className: 'form-horizontal'},
        h2({}, 'Sistema Auto Manager - Log In'),
        Input({
          ref: 'emailInput',
          type: 'email',
          label: 'Email',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          placeholder: 'Digite seu email'
        }),
        Input({
          ref: 'passwordInput',
          type: 'password',
          label: 'Senha',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          placeholder: 'Digite sua senha'
        }),
        errorMsg,
        ButtonInput({
          type: 'submit',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: 'Entrar'
        }),
        ButtonInput({
          value: 'Cadastre-se',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          onClick: this.transitionTo.bind(null, 'cadastro')
        })
        // )
      )
    )
  }
})

module.exports = Login