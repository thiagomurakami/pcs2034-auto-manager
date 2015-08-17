var React               = require('react')
var u                   = require('underscore')
var jquery 						  = require('jquery')
var jajax 						  = require('jquery').ajax
var moment              = require('moment').utc
var Navigation          = require('react-router').Navigation;

var OrdemServicoStore = require('../../../stores/ordemServicoStore')

var OrdemServicoActions = require('../../../actions/ordemServicoActions')

// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var FormControls = React.createFactory(require('react-bootstrap').FormControls.Static)
var Grid = React.createFactory(require('react-bootstrap').Grid)
var Row = React.createFactory(require('react-bootstrap').Row)
var Col = React.createFactory(require('react-bootstrap').Col)
var Select = React.createFactory(require('react-select'))
var div = React.createFactory('div')
var p = React.createFactory('p')
var b = React.createFactory('b')
var form = React.createFactory('form')
var input = React.createFactory('input')
var span = React.createFactory('span')
var option = React.createFactory('option')

require('react-select/less/default.less')

var CriarOrdemServico = React.createClass({
  mixins: [Navigation],
  getInitialState: function(){
    return({
      placaveiculo: '',
      idequipe: '',
      status: 'pendente',
      dataPrevisao: '',
      dataEmissao: moment().format("YYYY-MM-DD"),
      dataExecucao: moment().format("YYYY-MM-DD"),
      dataConclusao: '',
      valor: 0,
      descricao: '',
      cliente: null,
      listaServicos: OrdemServicoStore.getTipoServico(),
      listaClientes: OrdemServicoStore.getClientes(),
      listaVeiculos: OrdemServicoStore.getListaVeiculos(),
      listaPecas: OrdemServicoStore.getListaPecas(),
      listaEquipes: OrdemServicoStore.getListaEquipes(),
      servicosSelecionados: [],
      pecasSelecionadas: [],
      pecasOs: {}
    })
  },
  componentDidMount: function(){
    OrdemServicoStore.addChangeListener("rerender", this._dataChange)
    OrdemServicoActions.getTipoServico()
    OrdemServicoActions.getClientes()
    OrdemServicoActions.getPecas()
    OrdemServicoActions.getEquipes(moment().format("YYYY-MM-DD"))
  },
  componentWillUnmount: function(){
    OrdemServicoStore.removeChangeListener("rerender", this._dataChange)
  },

  _dataChange: function(){
    console.log("_dataChange")
    var newState = {
      listaServicos: OrdemServicoStore.getTipoServico(),
      listaVeiculos: OrdemServicoStore.getListaVeiculos(),
      listaPecas: OrdemServicoStore.getListaPecas(),
      listaEquipes: OrdemServicoStore.getListaEquipes(),
      listaClientes: OrdemServicoStore.getClientes()
    }
    if(!u.isEqual(this.state.listaClientes, OrdemServicoStore.getClientes())){
      newState.cliente = OrdemServicoStore.getClientes()[0].codigocadastro
      OrdemServicoActions.getVeiculos(OrdemServicoStore.getClientes()[0].codigocadastro)
    }
    if(!u.isEqual(this.state.listaVeiculos, OrdemServicoStore.getListaVeiculos())){
      newState.placaveiculo = OrdemServicoStore.getListaVeiculos()[0].placa
    }
    if(!u.isEqual(this.state.listaEquipes, OrdemServicoStore.getListaEquipes())){
      newState.horaExecucao = OrdemServicoStore.getListaEquipes()[0].horarios[0]
      newState.idequipe =  OrdemServicoStore.getListaEquipes()[0].idequipe
    }
    newState.pecasOs = this.state.pecasOs
    OrdemServicoStore.getListaPecas().forEach(function(peca){
      if(!newState.pecasOs[peca.label]){
        newState.pecasOs[peca.label] = {}
        newState.pecasOs[peca.label].quantidade = 0
        newState.pecasOs[peca.label].idpeca = peca.value
        newState.pecasOs[peca.label].preco = parseFloat(peca.preco.replace("$", ''))
      }
    })

    this.setState(newState)
  },

  interceptEvent: function(event){
    if(event){
      if(event.preventDefault) event.preventDefault()
      if(event.stopPropagation) event.stopPropagation()
    }
  },

  _handleInputChange: function(stateKey, e){
    var newState = {}
    newState[stateKey] = e.target.value
    this.setState(newState)
  },

  _handleServicos: function(values, selectedOptions){
    var valor = 0
    selectedOptions.forEach(function(servico){
      valor += servico.preco
    })
    u.keys(this.state.pecasOs).forEach(function(key){
      valor += this.state.pecasOs[key].quantidade * this.state.pecasOs[key].preco
    }.bind(this))
    this.setState({
      servicosSelecionados: selectedOptions,
      valor: valor
    })
  },
  _handleClienteChange: function(e){
    OrdemServicoActions.getVeiculos(e.target.value)
    this.setState({cliente: e.target.value})
  },

  _handlePecas: function(values, selectedOptions){
    var selectedPecas = selectedOptions.map(function(peca){
      return peca.label
    })
    var newPecasOs = this.state.pecasOs
    var valor = 0
    u.keys(this.state.pecasOs).forEach(function(peca){
      if(!u.contains(selectedPecas, peca)){
        newPecasOs[peca].quantidade = 0
      }
    })
    this.state.servicosSelecionados.forEach(function(servico){
      valor += servico.preco
    })
    u.keys(newPecasOs).forEach(function(key){
      valor += newPecasOs[key].quantidade * newPecasOs[key].preco
    }.bind(this))
    this.setState({
      pecasSelecionadas: selectedOptions,
      pecasOs: newPecasOs,
      valor: valor
    })
  },
  _handlePeca: function(peca, e){
    var newPecaState = this.state.pecasOs
    var valor = 0
    newPecaState[peca].quantidade = parseInt(e.target.value)
    this.state.servicosSelecionados.forEach(function(servico){
      valor += servico.preco
    })
    u.keys(newPecaState).forEach(function(key){
      valor += newPecaState[key].quantidade * newPecaState[key].preco
    }.bind(this))
    this.setState({
      pecasOs: newPecaState,
      valor: valor
    })
  },

  _handleDataExecucao: function(e){
    OrdemServicoActions.getEquipes(e.target.value)
    this.setState({dataExecucao: e.target.value})
  },
  _sendToApi: function(e){
    console.log(this.state)
    this.interceptEvent(e)
    var objToSend = jquery.extend(true, {}, this.state)
    objToSend.pecas = u.keys(objToSend.pecasOs).map(function(peca){
      return {
        idpeca: objToSend.pecasOs[peca].idpeca,
        quantidade: objToSend.pecasOs[peca].quantidade
      }
    })
    objToSend.pecas = u.filter(objToSend.pecas, function(obj){
      return obj.quantidade > 0
    })
    var keysToRemove = ['listaClientes', 'listaEquipes', 'listaPecas', 'listaServicos', 'listaVeiculos',
      'pecasOs', 'pecasSelecionadas', 'cliente']
    if(objToSend.dataConclusao == '') keysToRemove.push('dataConclusao')
    objToSend = u.omit(objToSend, keysToRemove)
    OrdemServicoActions.createOrdemServico(objToSend)
    this.goBack()
  },

  render: function(){
    var listaClientes = this.state.listaClientes.map(function(cliente, index){
      var label = cliente.codigocadastro+"- "+cliente.nome+" "+cliente.sobrenome
      return option({key: "dono-"+cliente.codigocadastro, value: cliente.codigocadastro}, label)
    })
    var veiculosArr = this.state.listaVeiculos.map(function(veiculo, index){
      return option({key: 'veiculos-'+index, value: veiculo.placa}, veiculo.placa)
    })
    var selectPecas = this.state.pecasSelecionadas.map(function(peca, index){
      return Input({
          key: "select-peca-"+index,
          type: 'select',
          label: peca.label,
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.pecasOs[peca.label].quantidade,
          onChange: this._handlePeca.bind(null, peca.label)
        },
        u.range(0, peca.quantidade+1).map(function(quantidade, index){
          return option({key: 'peca-quantidade-'+index, value: quantidade}, quantidade)
        })
      )
    }.bind(this))
    var listaEquipes = this.state.listaEquipes.map(function(equipe, index){
      var label = (index===0) ? equipe.idequipe + " (Equipe sugerida)" : equipe.idequipe
      return option({key: 'equipe-'+index, value: equipe.idequipe}, label)
    }.bind(this))

    if(u.findWhere(this.state.listaEquipes, {idequipe: this.state.idequipe})){
      var horarios = u.findWhere(this.state.listaEquipes, {idequipe: this.state.idequipe}).horarios.map(
        function(horario, index){
          return option({key: 'horario-'+index, value: horario}, ""+horario+":00")
        })
    }
    return(
      form({onSubmit: this._sendToApi, className: 'form-horizontal'},
        Input({
            type: 'select',
            label: 'Cliente',
            labelClassName: 'col-xs-1',
            wrapperClassName: 'col-xs-11',
            value: this.state.cliente,
            onChange: this._handleClienteChange
          },
          listaClientes
        ),
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
            label: 'Status OS',
            labelClassName: 'col-xs-1',
            wrapperClassName: 'col-xs-11',
            value: this.state.status,
            onChange: this._handleInputChange.bind(null, 'status')
          },
          option({value: 'pendente'}, 'Pendente'),
          option({value: 'aprovada'}, 'Aprovada'),
          option({value: 'suspensa'}, 'Suspensa'),
          option({value: 'finalizada'}, 'Finalizada')
        ),
        Input({
          type: 'date',
          label: 'Data Execução',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.dataExecucao,
          onChange: this._handleDataExecucao
        }),
        Input({
            type: 'select',
            label: 'Equipe',
            labelClassName: 'col-xs-1',
            wrapperClassName: 'col-xs-11',
            value: this.state.idequipe,
            onChange: this._handleInputChange.bind(null, 'idequipe')
          },
          listaEquipes
        ),
        Input({
            type: 'select',
            label: 'Hora Execução',
            labelClassName: 'col-xs-1',
            wrapperClassName: 'col-xs-11',
            value: this.state.horaExecucao,
            onChange: this._handleInputChange.bind(null, 'horaExecucao')
          },
          horarios
        ),
        Input({
          type: 'date',
          label: 'Data Previsão',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.dataPrevisao,
          onChange: this._handleInputChange.bind(null, 'dataPrevisao')
        }),
        Input({
          type: 'date',
          label: 'Data Emissão',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.dataEmissao,
          onChange: this._handleInputChange.bind(null, 'dataEmissao')
        }),
        Input({
          type: 'date',
          label: 'Data Conclusão',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          value: this.state.dataConclusao,
          onChange: this._handleInputChange.bind(null, 'dataConclusao')
        }),
        Grid({fluid: true},
          Row({className: 'show-grid'},
            Col({xs: 4, md: 1}, b({}, 'Tipos de Serviço: ')),
            Col({xs: 16, md: 11},
              Select({
                name: 'form-field-name',
                placeholder: 'Tipos de Serviço',
                options: this.state.listaServicos,
                value: this.state.servicosSelecionados,
                multi: true,
                onChange: this._handleServicos
              })
            )
          ),
          <br />,
          Row({className: 'show-grid'},
            Col({xs: 4, md: 1}, b({}, 'Peças: ')),
            Col({xs: 16, md: 11},
              Select({
                name: 'form-field-name',
                placeholder: 'Peças',
                options: this.state.listaPecas,
                value: this.state.pecasSelecionadas,
                multi: true,
                onChange: this._handlePecas
              })
            )
          ),
          <br />
        ),
        selectPecas,
        Input({
          type: 'textarea',
          label: 'Descrição',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          placeholder: 'Digite a descrição da OS',
          value: this.state.descricao,
          onChange: this._handleInputChange.bind(null, 'descricao')
        }),
        b({}, 'Valor Total da OS: '+"R$ "+this.state.valor),
        ButtonInput({
          type: 'submit',
          value: 'Criar OS',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          onClick: this._sendToApi
        }),
        ButtonInput({
          type: 'button',
          value: 'Voltar',
          labelClassName: 'col-xs-1',
          wrapperClassName: 'col-xs-11',
          onClick: this.goBack
        })

      )
    )
  }
})

module.exports = CriarOrdemServico