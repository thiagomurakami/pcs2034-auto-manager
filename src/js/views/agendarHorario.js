var React = require('react')
var moment = require('moment')

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

var minDate = moment().format('YYYY-MM-DD')
var maxDate = moment().add(30, 'days').format('YYYY-MM-DD')
console.log(minDate)
console.log(maxDate)

var CreateModal = React.createClass({
  getInitialState: function(){
    return {
      data: ''
    }
  },
	getDefaultProps: function(){
    return {
      
    }
  },
  render: function(){
    var horariosArr = []
    horariosArr.push(option({key: 'horario-1', value: 16}, '16:00'))
    horariosArr.push(option({key: 'horario-2', value: 17}, '17:00'))
    return(
        form({},
          h4({}, 'Agendar Horário'),
          Input({type: 'date', max: maxDate, min: minDate, defaultValue: minDate}),
          Input({type: 'select'}, horariosArr),
          ButtonInput({type: 'submit', value: 'Agendar'})
          )
      )
  }
})

module.exports = CreateModal