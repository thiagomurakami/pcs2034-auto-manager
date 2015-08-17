var React = require('react')

var EquipeStore = require('../../../stores/equipeStore')

var EquipeActions = require('../../../actions/equipeAction')

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
var option = React.createFactory('option')

var CreateModal = React.createClass({
  getInitialState: function(){
    return {
      codtecnico1: '',
      codtecnico2: '',
      especialidade: ''
    }
  },
  getDefaultProps: function(){
    return {
      show: false,
      onHide: function(){},
      values: [],
      onClick: function(){},
      title: "Alterar Equipe"
    }
  },

  componentWillReceiveProps: function(nextProps){
    var newState = {}
    for(var key in this.state){
      newState[key] = nextProps.data[key]
    }
    this.setState(newState)
  },
  _handleInputChange: function(stateKey, e){
    var newState = {}
    newState[stateKey] = e.target.value
    this.setState(newState)
  },
  _sendToApi: function(){
    EquipeActions.updateEquipe(this.state, this.props.index)
    this.setState({
      codtecnico1: '',
      codtecnico2: ''
    })
    this.props.onHide()
  },
  render: function(){
    var tecnicosArr = this.props.tecnicos.map(function(tecnico, index){
      return option({key: 'codTecnicno-'+index, value: tecnico.codigocadastro}, tecnico.nome+" "+tecnico.sobrenome)
    })
    return(
      Modal({show: this.props.show, onHide: this.props.onHide},
        ModalHeader({}, ModalTitle(), h4({}, this.props.title)),
        ModalBody({},
          Input({
            type: 'select',
            label: "Primeiro Técnico",
            value: this.state.codtecnico1,
            onChange: this._handleInputChange.bind(null, 'codtecnico1')
          }, tecnicosArr),
          Input({
            type: 'select',
            label: "Segundo Técnico",
            value: this.state.codtecnico2,
            onChange: this._handleInputChange.bind(null, 'codtecnico2')
          }, tecnicosArr),
          Input({
            type: 'text',
            label: "Especialidade",
            value: this.state.especialidade,
            onChange: this._handleInputChange.bind(null, 'especialidade')
          })
        ),
        ModalFooter({}, Button({onClick: this.props.onHide}, 'Fechar'), Button({onClick: this._sendToApi}, 'Alterar'))
      )
    )
  }
})

module.exports = CreateModal
