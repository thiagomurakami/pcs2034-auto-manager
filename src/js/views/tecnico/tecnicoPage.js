var React = require('react')

var SessionStore = require('../../stores/sessionStore')

var div = React.createFactory('div')
var Header = React.createFactory(require('../../components/header.js'))
var SideMenu = React.createFactory(require('../../components/sideMenu.js'))
var Footer = React.createFactory(require('../../components/footer.js'))

var br = React.createFactory('br')

var Router = require('react-router')
var RouteHandler  = Router.RouteHandler

var TecnicoPage = React.createClass({
  getInitialState: function(){
    return {
      links: [
        {path: '#/tecnico/ordemServico', label: "Ver Ordens"},
        {path: '#/tecnico/agenda', label: "Ver Agenda"},
        {path: '#/tecnico/editar', label: "Editar Dados"}
      ]
    }
  },
  statics: {
    willTransitionTo: function (transition) {
      if (SessionStore.getState().tipo !== "tecnico") {
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
      Header({title: 'Técnico'}),
      SideMenu({links: this.state.links}),
      div({style: contentStyle},
        <RouteHandler />
      ),
      br(),
      Footer()
    )
  }
})

module.exports = TecnicoPage
