var React = require('react')
var moment = require('moment')
var u = require('underscore')
var jquery = require('jquery')
var Navigation = require('react-router').Navigation

var AgendarHorarioStore = require('../../../stores/agendarHorarioStore')
var SessionStore = require('../../../stores/sessionStore')

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
var option = React.createFactory('option')

var minDate = moment().format('YYYY-MM-DD')
var maxDate = moment().add(30, 'days').format('YYYY-MM-DD')

var CreateModal = React.createClass({
  mixins: [Navigation],
  getInitialState: function(){
    return {
      data: minDate,
      hora: '',
      tecnicos: [],
      codgerente: '',
      idcliente: SessionStore.getId(),
      placaveiculo: '',
      listaHorarios: AgendarHorarioStore.getHorarios(),
      listaGerentes: AgendarHorarioStore.getListaGerentes(),
      listaVeiculos: AgendarHorarioStore.getListaVeiculos()
    }
  },
  componentDidMount: function(){
    AgendarHorarioStore.addChangeListener("rerender", this._dataChange)
    AgendarHorarioAction.getGerentes()
    AgendarHorarioAction.getVeiculos(SessionStore.getId())
    AgendarHorarioAction.getHorariosDisponiveis(minDate)
  },
  componentWillUnmount: function(){
    AgendarHorarioStore.removeChangeListener("rerender", this._dataChange)
  },
  getDefaultProps: function(){
    return {
      show: false,
      values: [],
      title: "Realizar Agendamento"
    }
  },
  _dataChange: function(){
    var horarioDefault = null
    var tecnicoDefault = null
    var veiculoDefault = null
    if(!u.isEqual(this.state.listaHorarios, AgendarHorarioStore.getHorarios()) || AgendarHorarioStore.getHorarios()){
      horarioDefault = u.first(jquery.extend(true, [], AgendarHorarioStore.getHorarios()))
      tecnicoDefault = horarioDefault.tecnicosDisponiveis[0]
      this.setState({
        tecnicos: horarioDefault.tecnicosDisponiveis,
        hora: horarioDefault.hora,
        codgerente: tecnicoDefault
      })
    }
    if(!u.isEqual(this.state.listaVeiculos, AgendarHorarioStore.getListaVeiculos())){
      veiculoDefault = u.first(jquery.extend(true, [], AgendarHorarioStore.getListaVeiculos()))
      this.setState({placaveiculo: veiculoDefault.placa})
    }
    this.setState({
      listaHorarios: AgendarHorarioStore.getHorarios(),
      listaGerentes: AgendarHorarioStore.getListaGerentes(),
      listaVeiculos: AgendarHorarioStore.getListaVeiculos()
    })
  },
  _handleInputChange: function(stateKey, e){
    var newState = {}
    newState[stateKey] = e.target.value
    this.setState(newState)
  },
  _handleHoraChange: function(e){
    var tecnicosDisponiveis = u.filter(jquery.extend(true, [], this.props.horarios), function(horario){
      return horario.hora === e.target.value
    })
    tecnicosDisponiveis = tecnicosDisponiveis[0].tecnicosDisponiveis
    this.setState({hora: e.target.value, tecnicos: tecnicosDisponiveis, codgerente: tecnicosDisponiveis[0]})
  },
  _handleDataChange: function(e){
    AgendarHorarioAction.getHorariosDisponiveis(e.target.value)
    this.setState({data: e.target.value})
  },
  _sendToApi: function(){
    var objToSend = jquery.extend(true, {}, this.state)
    objToSend = u.omit(objToSend, 'tecnicos', 'listaHorarios', 'listaGerentes', 'listaVeiculos')
    AgendarHorarioAction.createAgendarHorario(objToSend)
    this.transitionTo('verHorariosCliente')
  },
  render: function(){
    var listaTecnicos = AgendarHorarioStore.getListaGerentes()
    var horariosArr = this.state.listaHorarios.map(function(horario, index){
      return option({key: 'horario-'+index}, horario.hora)
    })
    var veiculosArr = this.state.listaVeiculos.map(function(veiculo, index){
      return option({key: 'veiculos-'+index, value: veiculo.placa}, veiculo.placa)
    })
    var tecnicosDisponiveis = this.state.tecnicos.map(function(codgerente, index){
      if(listaTecnicos.length > 0){
        var gerenteUnico = u.findWhere(listaTecnicos, {codigocadastro: codgerente})
        var label = codgerente+" - "+gerenteUnico.nome
        if(gerenteUnico.sobrenome) label += " "+gerenteUnico.sobrenome
        return option({key: 'codTecnicno-'+index, value: codgerente}, label)
      }
      else return option({key: 'codTecnicno-'+index, value: codgerente}, codgerente)
    })
    return(
      form({className: 'form-horizontal'},
        h4({}, this.props.title),
        Input({
          type: 'date',
          label: "Data",
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          max: maxDate,
          min: minDate,
          defaultValue: minDate,
          value: this.state.data,
          onChange: this._handleDataChange
        }),
        Input({
          type: 'select',
          label: "Horário",
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.hora,
          onChange: this._handleHoraChange
        }, horariosArr),
        Input({
            type: 'select',
            label: 'Veículo',
            labelClassName: 'col-xs-1',
            wrapperClassName: 'col-xs-11',
            value: this.state.placaveiculo,
            onChange: this._handleInputChange.bind(null, 'placaveiculo')
          },
          veiculosArr
        ),
        Input({
            type: 'select',
            label: 'Gerente Técnico',
            labelClassName: 'col-xs-1',
            wrapperClassName: 'col-xs-11',
            value: this.state.codgerente,
            onChange: this._handleInputChange.bind(null, 'codgerente')
          },
          tecnicosDisponiveis
        ),
        Button({onClick: this.props.onHide}, 'Voltar'),
        Button({type: 'button', onClick: this._sendToApi}, 'Agendar Horário')
    )
    )
  }
})

module.exports = CreateModal
