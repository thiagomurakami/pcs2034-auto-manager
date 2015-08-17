var React = require('react');
var u = require('underscore')
var moment = require('moment')

var SessionStore = require('../../stores/sessionStore')

var Table = React.createFactory(require('react-bootstrap').Table)
var Button = React.createFactory(require('react-bootstrap').Button)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var Input = React.createFactory(require('react-bootstrap').Input)
var div = React.createFactory('div')
var p = React.createFactory('p')
var h4 = React.createFactory('h4')
var form = React.createFactory('form')
var thead = React.createFactory('thead')
var table = React.createFactory('table')
var tbody = React.createFactory('tbody')
var th = React.createFactory('th')
var td = React.createFactory('td')
var tr = React.createFactory('tr')
var span = React.createFactory('span')

var minDate = moment().format('YYYY-MM-DD')

var HomeCliente = React.createClass({
  render: function(){
    var nome = SessionStore.getState().nome
    var sobrenome = SessionStore.getState().sobrenome
    return (
      div({},
        h4({}, "Bem-vindo, "+nome+" "+sobrenome),
        p({},"Por-favor, selecione o serviço no menu acima!")
      )
    )
  }
})


module.exports = HomeCliente
