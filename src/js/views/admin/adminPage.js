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
        {path: '#/admin/tipoServico', label: "CRUD Tipo Serviço"},
        {path: '#/admin/horarioCliente', label: "CRUD Horário Cliente"},
        {path: '#/admin/veiculo', label: "CRUD Veículo"},
        {path: '#/admin/usuario', label: "CRUD Usuário"},
        {path: '#/admin/ordemServico', label: "CRUD OS"},
        {path: '#/admin/pecas', label: "CRUD Peças"},
        {path: '#/admin/equipes', label: "CRUD Equipes"},
      ]
    }
  },
  statics: {
    willTransitionTo: function (transition) {
      if (SessionStore.getState().tipo !== "admin") {
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
      Header({title: 'Admin'}),
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