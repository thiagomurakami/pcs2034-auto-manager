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
// ADMIN
var AdminCrudUsuario = require('./admin/usuario/crudUsuario')
var AdminCrudVeiculo = require('./admin/veiculo/crudVeiculo')
var AdminCrudTipoServico = require('./admin/tipoServico/crudTipoServico')
var AdminCrudHorarioCliente = require('./admin/horario/crudHorario')
var AdminCrudOs = require('./admin/ordemServico/crudOrdemServico')
var AdminCriarOS = require('./admin/ordemServico/criarOrdemServico')
var AdminEditarOS = require('./admin/ordemServico/editarOrdemServico')
// CLIENTE
var ClienteHome = require('./cliente/clienteHome')
var ClienteVerHorario = require('./cliente/horarios/verHorarios')
var ClienteAgendarHorario = require('./cliente/horarios/agendarHorario')
var ClienteEditarDados = require('./cliente/editarDadosCadastrais')
var ClienteCrudVeiculo = require('./cliente/veiculo/crudVeiculo')

// ATENDENTE

var AuthenticationApp = require('./authenticationApp')

// Pages
var CadastroCliente = require('./cadastroCliente')
var AdminPage = require('./admin/adminPage')
var TecnicoPage = require('./tecnico/tecnicoPage')
var AtendentePage = require('./atendente/atendentePage')
var ClientePage = require('./cliente/clientePage')
var GerentePage = require('./gerente/gerentePage')

var Teste = require('./admin/ordemServico/crudOrdemServico')

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
        <DefaultRoute handler={AdminCrudUsuario} />
        <Route name="crudTipoServicoAdmin" path='tipoServico' handler={AdminCrudTipoServico} />
        <Route name="crudVeiculoAdmin" path='veiculo' handler={AdminCrudVeiculo} />
        <Route name="crudUsuarioAdmin" path='usuario' handler={AdminCrudUsuario} />
        <Route name="crudHorarioAdmin" path='horarioCliente' handler={AdminCrudHorarioCliente} />
        <Route name="crudOs" path='ordemServico' handler={AdminCrudOs} />
        <Route name="criarOs" path="criarOs" handler={AdminCriarOS} />
        <Route name="editarOs" path="editarOs/:id" handler={AdminEditarOS} />
      </Route>
      <Route name="tecnico" handler={TecnicoPage}>

      </Route>
      <Route name="gerente" handler={GerentePage}>

      </Route>
      <Route name="cliente" handler={ClientePage}>
        <DefaultRoute handler={ClienteHome} />
        <Route name="verHorariosCliente" path='verHorarios' handler={ClienteVerHorario} />
        <Route name="agendarHorarioCliente" path='agendar' handler={ClienteAgendarHorario} />
        <Route name="editarDadosCliente" path='editar' handler={ClienteEditarDados} />
        <Route name="veiculosCliente" path='veiculos' handler={ClienteCrudVeiculo} />
      </Route>
      <Route name="atendente" handler={AtendentePage}>
        <Route name="crudVeiculoAtendente" path='veiculo' handler={AdminCrudVeiculo} />
        <Route name="crudUsuarioAtendente" path='usuario' handler={CadastroCliente} />
        <Route name="crudHorarioAtendente" path='horarioCliente' handler={AdminCrudHorarioCliente} />
        <Route name="editarAtendente" path='editar' handler={ClienteEditarDados} />
      </Route>
    </Route>

    <NotFoundRoute name="notFound" handler={NotFound} />
  </Route>
) 

var router = Router.create({routes: routes});
RouterContainer.set(router);

router.run(function(Handler, state){
  var params = state.params
  var query = state.query
  React.render(<Handler routerParams={params} routerQuery={query}/>, document.body)
})


// React.render(<MainPage />, document.body)