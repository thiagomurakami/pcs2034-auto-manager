var React = require('react')
var moment = require('moment')
var u = require('underscore')
var jquery = require('jquery')

var AgendarHorarioStore = require('../../../stores/agendarHorarioStore')

var AgendarHorarioActions = require('../../../actions/agendarHorarioActions')

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

var UpdateModal = React.createClass({
  getInitialState: function(){
    return {
      data: minDate,
      hora: '',
      codgerente: '',
      idcliente: '',
      placaveiculo: '',
      tecnicos: []
    }
  },
  componentWillReceiveProps: function(nextProps){
    var newState = {}
    var horarioDefault = null
    if(!u.isEqual(nextProps.horarios, this.props.horarios)){
      horarioDefault = u.first(jquery.extend(true, [], nextProps.horarios))
    }
    if(horarioDefault) {
      this.setState({
        tecnicos: horarioDefault.tecnicosDisponiveis
      })
    }
    if(!u.isEqual(nextProps.data, this.props.data)){
      for(var key in this.state){
        if(nextProps.data[key]) newState[key] = nextProps.data[key]
      }
      this.setState(newState)
    }
  },
  getDefaultProps: function(){
    return {
      show: false,
      onHide: function(){},
      data: {},
      onClick: function(){},
      title: "Alterar Horário"
    }
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
    this.setState({hora: e.target.value, tecnicos: tecnicosDisponiveis})
  },
  _handleDataChange: function(e){
    AgendarHorarioActions.getHorariosDisponiveis(e.target.value)
    this.setState({data: e.target.value})
  },

  _handleClienteChange: function(e){
    AgendarHorarioActions.getVeiculos(e.target.value)
    this.setState({idcliente: e.target.value})
  },

  _sendToApi: function(){
    var newValues = jquery.extend(true, {}, this.props.data)
    var oldValues = jquery.extend(true, {}, this.state)
    newValues = u.omit(newValues, 'cliente', 'tecnico')
    oldValues = u.omit(oldValues, 'tecnicos')
    AgendarHorarioActions.updateAgendarHorario(newValues, oldValues)
    this.props.onHide()
  },

  render: function(){
    var listaTecnicos = AgendarHorarioStore.getListaGerentes()
    var horariosArr = this.props.horarios.map(function(horario, index){
      return option({key: 'horario-'+index}, horario.hora)
    })
    var listaClientes = this.props.clientes.map(function(cliente, index){
      var label = cliente.codigocadastro+"- "+cliente.nome+" "+cliente.sobrenome
      return option({key: "dono-"+cliente.codigocadastro, value: cliente.codigocadastro}, label)
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
    var veiculosArr = this.props.veiculos.map(function(veiculo, index){
      return option({key: 'veiculos-'+index, value: veiculo.placa}, veiculo.placa)
    })
    return(
      Modal({show: this.props.show, onHide: this.props.onHide},
        ModalHeader({}, ModalTitle(), h4({}, this.props.title)),
        ModalBody({},
          Input({
            type: 'date',
            max: maxDate,
            value: this.state.data,
            onChange: this._handleDataChange
          }),
          Input({
            type: 'select',
            label: "Horário",
            value: this.state.hora,
            onChange: this._handleHoraChange
          }, horariosArr),
          Input({
              type: 'select',
              label: 'Cliente',
              value: this.state.idcliente,
              onChange: this._handleClienteChange
            },
            listaClientes
          ),
          Input({
              type: 'select',
              label: 'Veículo',
              value: this.state.placaveiculo,
              onChange: this._handleInputChange.bind(null, 'placaveiculo')
            },
            veiculosArr
          ),
          Input({
              type: 'select',
              label: 'Gerente Técnico',
              value: this.state.codgerente,
              onChange: this._handleInputChange.bind(null, 'codgerente')
            },
            tecnicosDisponiveis
          )
        ),
        ModalFooter({}, Button({onClick: this.props.onHide}, 'Fechar'), Button({onClick: this._sendToApi}, 'Alterar'))
      )
    )
  }
})

module.exports = UpdateModal
