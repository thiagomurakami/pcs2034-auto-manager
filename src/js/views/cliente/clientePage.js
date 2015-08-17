var React = require('react')

var SessionStore = require('../../stores/sessionStore')

var div = React.createFactory('div')
var Header = React.createFactory(require('../../components/header.js'))
var SideMenu = React.createFactory(require('../../components/sideMenu.js'))
var Footer = React.createFactory(require('../../components/footer.js'))

var br = React.createFactory('br')

var Router = require('react-router')
var RouteHandler  = Router.RouteHandler

var AdminPage = React.createClass({
  getInitialState: function(){
    return {
      links: [
        {path: '#/cliente/verHorarios', label: "Ver Horários"},
        {path: '#/cliente/agendar', label: "Agendar Horário"},
        {path: '#/cliente/editar', label: "Alterar Dados Cadastrais"},
        {path: '#/cliente/veiculos', label: "Veículos"},
        //{path: '/admin/horarioCliente', label: "CRUD Horário Cliente"},
        //{path: '/admin/veiculo', label: "CRUD Tipo Serviço"},
        //{path: '/admin/usuario', label: "CRUD Usuário"}
      ]
    }
  },
  statics: {
    willTransitionTo: function (transition) {
      if (SessionStore.getState().tipo !== "cliente") {
        transition.redirect('/'+SessionStore.getState().tipo, {}, {});
      }
    }
  },

  render: function(){
    var contentStyle = {
      float: 'center'//,
      //background: '#777777'
    }
    return div({className: 'fullContainerBody'},
      Header({title: 'Cliente'}),
      SideMenu({links: this.state.links}),
      div({style: contentStyle},
        <RouteHandler />
      ),
      br(),
      Footer()
    )
  }
})

module.exports = AdminPage