var React = require('react')
var moment = require('moment')
var jajax = require('jquery').ajax

var AgendarHorarioActions = require('../../actions/agendarHorarioActions')
var AgendarHorarioStore = require('../../stores/agendarHorarioStore')

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

var CreateModal = React.createClass({
  getInitialState: function(){
    return {
      data: '',
      horarios: []
    }
  },
  getDefaultProps: function(){
    return {

    }
  },
  componentWillMount: function(){
    var uri = 'apiv1/horarios/'+minDate
    console.log(uri)
    jajax({
      url: uri,
      type: 'GET',
      contentType: 'application/json',
      // data: JSON.stringify(requestBody),
      async: true
    }).done(function(res){
      console.log("done")
      this.setState({horarios: res})
    }.bind(this))
  },
  render: function(){
    var horariosArr = this.state.horarios.map(function(horario, index){
      return option({key: 'horario-'+index}, horario.hora)
    })
    // horariosArr.push(option({key: 'horario-1', value: 16}, '16:00'))
    // horariosArr.push(option({key: 'horario-2', value: 17}, '17:00'))
    return(
      form({},
        h4({}, 'Agendar Horário'),
        Input({type: 'date', max: maxDate, min: minDate, defaultValue: minDate}),
        Input({type: 'select', label: "Horário"}, horariosArr),
        ButtonInput({type: 'button', value: 'Agendar'})
      )
    )
  }
})

module.exports = CreateModal
