//Modules
var React                         = require('react')
var Router                        = require('react-router')
var jQuery = require('jquery')
var jajax = require('jquery').ajax

//stores

//services


//styles


//actions


//components
var div = React.createFactory('div')
var p = React.createFactory('p')
var input = React.createFactory('input')
var CreateUser = React.createFactory(require('./createUser.js'))
var Login = React.createFactory(require('./login.js'))
var Header = React.createFactory(require('../components/header.js'))
var SideMenu = React.createFactory(require('../components/sideMenu.js'))
var Footer = React.createFactory(require('../components/footer.js'))
var CreateTipoServico = React.createFactory(require('./tipoServico/createTipoServico'))
var CrudTipoServico = React.createFactory(require('./tipoServico/crudTipoServico'))
var CrudPeca = React.createFactory(require('./peca/crudPeca'))
var AgendarHorario = React.createFactory(require('./agendarHorario'))

var br = React.createFactory('br')

//Site

var MainPage = React.createClass({
  render: function() {
  	var contentStyle = {
  		float: 'center'//,
  		//background: '#777777'
  	}
    return (
      div({className: 'fullContainerBody'},
        Header(),
        SideMenu(),
        div({style: contentStyle}, CrudTipoServico()),
        br(),
        Footer()
        )
    )
  }
})


React.render(<MainPage />, document.body)