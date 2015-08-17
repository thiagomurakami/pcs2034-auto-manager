var React = require('react')

var AgendarHorarioStore = require('../../../stores/agendarHorarioStore')

var AgendarHorarioAction = require('../../../actions/agendarHorarioActions')

var Modal = React.createFactory(require('react-bootstrap').Modal)
var ModalHeader = React.createFactory(require('react-bootstrap').Modal.Header)
var ModalBody = React.createFactory(require('react-bootstrap').Modal.Body)
var ModalFooter = React.createFactory(require('react-bootstrap').Modal.Footer)
var ModalTitle = React.createFactory(require('react-bootstrap').Modal.Title)

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

var DeleteModalHorario = React.createClass({
  getDefaultProps: function(){
    return {
      show: false,
      onHide: function(){},
      data: {},
      index: 0,
      onClick: function(){},
      title: "Deseja cancelar o agendamento?"
    }
  },
  render: function(){
    return(
      Modal({show: this.props.show, onHide: this.props.onHide},
        ModalHeader({}, ModalTitle(), h4({}, this.props.title)),
        ModalBody({}, "Esta ação irá cancelar qualquer agendamento que este veículo possui. Deseja cancelar mesmo assim?"),
        ModalFooter({}, Button({onClick: this.props.onHide}, 'Fechar'), Button({onClick: this.props.cancelar}, 'Cancelar'))
      )
    )
  }
})

module.exports = DeleteModalHorario