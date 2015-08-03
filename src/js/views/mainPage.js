//Modules
var React                         = require('react')
var Router                        = require('react-router')
var jQuery = require('jquery')
var jajax = require('jquery').ajax

//stores
var SessionStore = require('../stores/sessionStore')

//services
var RouterContainer = require('../services/routerContainer')

//styles


//actions


//components
var div = React.createFactory('div')
var p = React.createFactory('p')
var input = React.createFactory('input')
var NotFound = require('./notFound')
var CreateUser = React.createFactory(require('./createUser.js'))
var Login = require('./login.js')
var Header = React.createFactory(require('../components/header.js'))
var SideMenu = React.createFactory(require('../components/sideMenu.js'))
var Footer = React.createFactory(require('../components/footer.js'))
var CrudUsuario = require('./admin/usuario/crudUsuario')
var CrudVeiculo = require('./admin/veiculo/crudVeiculo')
var CrudTipoServico = require('./admin/tipoServico/crudTipoServico')
var AgendarHorario = React.createFactory(require('./agendarHorario'))
var AuthenticationApp = require('./authenticationApp')
var AdminPage = require('./adminPage')
var TecnicoPage = require('./tecnicoPage')
var CadastroCliente = require('./cadastroCliente')

var Teste = require('./admin/horario/crudHorario')

var br = React.createFactory('br')

var DefaultRoute  = Router.DefaultRoute
var Route         = Router.Route
var RouteHandler  = Router.RouteHandler
var NotFoundRoute = Router.NotFoundRoute

//Site
var MainPage = React.createClass({

  statics: {
    willTransitionTo: function (transition) {
      if (!SessionStore.isLoggedIn()) {
        transition.redirect('/login', {}, {'nextPath' : transition.path});
      }
    }
  },

  componentDidMount: function(){
    SessionStore.addChangeListener("LOGIN_EVENT", this._onChange)
  },

  componentWillUnmount: function(){
    SessionStore.removeChangeListener("LOGIN_EVENT", this._onChange)
  },

  _onChange: function(){
    var updateState = SessionStore.getState()
    this.setState(updateState)
  },

  render: function() {
    return (
      <RouteHandler />
    )
  }
})

// Routes

var routes = (
  <Route handler={AuthenticationApp}>
    <Route name='teste' handler={Teste} />
    <Route name="login" handler={Login} />
    <Route name="cadastro" handler={CadastroCliente} />
    <Route name="app" path='/' handler={MainPage}>
      <Route name="admin" handler={AdminPage}>
        <Route name="crudTipoServico" path='tipoServico' handler={CrudTipoServico} />
        <Route name="crudVeiculo" path='veiculo' handler={CrudVeiculo} />
        <Route name="crudUsuario" path='usuario' handler={CrudUsuario} />
      </Route>
      <Route name="tecnico" handler={TecnicoPage}>

      </Route>
    </Route>

    <NotFoundRoute name="notFound" handler={NotFound} />
  </Route>
) 

var router = Router.create({routes: routes});
RouterContainer.set(router);

router.run(function(Handler, state){
  console.log(Handler)
  var params = state.params
  var query = state.query
  React.render(<Handler routerParams={params} routerQuery={query}/>, document.body)
})


// React.render(<MainPage />, document.body)