var React = require('react')
var moment = require('moment')
var EventEmitter = require('events').EventEmitter
var FluxDispatcher = require('../dispatcher/dispatcher.js')
var assign = require('object-assign')

var tableColumns = [
  {label: "ID", value: 'id'},
  {label: "Veículo", value: 'placaveiculo'},
  {label: "Equipe", value: 'idequipe'},
  {label: "Status", value: 'status'},
  {label: "Data Emissão", value: 'dataemissao'},
  {label: "Data Previsão", value: 'dataprevisao'},
  {label: "Data Conclusão", value: 'dataconclusao'},
  {label: "Valor", value: 'valor'},
  {label: "Descrição", value: 'descricao'}
]
var tableData = []

var tecnicoColumns = [
  {label: "Data", value: 'data'},
  {label: "Hora", value: 'hora'},
  {label: "Código Equipe", value: 'codequipe'},
  {label: "Número OS", value: 'idos'}
]
var agendaTecnicoData = []
var editarOsState = {}

var tipoServico = []
var clientes = []
var listaVeiculos = []
var listaPecas = []
var listaEquipes = []

var OrdemServicoStore = assign({}, EventEmitter.prototype, {
  getTableData: function(){
    return tableData
  },
  getTableColumns: function(){
    return tableColumns
  },
  getTipoServico: function(){
    return tipoServico
  },
  getAgendaTecnicoColumns: function(){
    return tecnicoColumns
  },
  getAgendaTecnicoData: function(){
    return agendaTecnicoData
  },
  getEditState: function(){
    return editarOsState
  },
  getClientes: function(){
    return clientes
  },
  getListaVeiculos: function(){
    return listaVeiculos
  },
  getListaPecas: function(){
    return listaPecas
  },
  getListaEquipes: function(){
    return listaEquipes
  },
  emitChange: function(eventString){
    this.emit(eventString)
  },

  addChangeListener: function(eventString, callback){
    this.on(eventString, callback)
  },

  removeChangeListener: function(eventString, callback){
    this.removeListener(eventString, callback)
  },

  dispatcherIndex: FluxDispatcher.register(function(dispatchedObj){
    switch(dispatchedObj.actionType){
      case "changeOrdemServico":
        OrdemServicoStore.emitChange("refetch")
        break;
      case "readOrdemServico":
        dispatchedObj.rows.forEach(function(row){
          if(row.dataconclusao) row.dataconclusao = moment(row.dataconclusao).format("YYYY-MM-DD")
          row.dataprevisao = moment(row.dataprevisao).format("YYYY-MM-DD")
          row.dataemissao = moment(row.dataemissao).format("YYYY-MM-DD")
        })
        tableData = dispatchedObj.rows
        OrdemServicoStore.emitChange("rerender")
        break
      case "deepReadOrdemServico":
        var ordemServicoInfo = dispatchedObj.info[0][0]
        var horarioOs = dispatchedObj.info[1][0]
        var pecasOs = dispatchedObj.info[2]
        var servicosOs = dispatchedObj.info[3]
        var newEditarState = {
          placaveiculo: ordemServicoInfo.placaveiculo,
          idequipe: ordemServicoInfo.idequipe,
          status: ordemServicoInfo.status,
          dataPrevisao: moment(ordemServicoInfo.dataprevisao).format("YYYY-MM-DD"),
          dataEmissao: moment(ordemServicoInfo.dataemissao).format("YYYY-MM-DD"),
          dataExecucao: horarioOs.data ? moment(ordemServicoInfo.dataemissao).format("YYYY-MM-DD") : '',
          dataConclusao: ordemServicoInfo.dataconclusao ? moment(ordemServicoInfo.dataconclusao).format("YYYY-MM-DD"):'',
          horaExecucao: parseInt(horarioOs.hora.substring(0, 2)),
          valor: parseFloat(ordemServicoInfo.valor.replace(/[^0-9\.]+/g,"")),
          descricao: ordemServicoInfo.descricao,
          servicosSelecionados: [],
          pecasSelecionadas: [],
          pecasOs: {}
        }
        newEditarState.pecasSelecionadas = pecasOs.map(function(peca){
          newEditarState.pecasOs[peca.nome] = {
            idpeca: peca.idpeca,
            preco: parseFloat(peca.preco.replace(/[^0-9\.]+/g,"")),
            quantidade: peca.quantidade
          }
          return {
            label: peca.nome,
            preco: peca.preco,
            value: peca.idpeca,
            quantidade: peca.quantidade,
            total: peca.quantidadetotal
          }
        })
        newEditarState.servicosSelecionados = servicosOs.map(function(servico){
          return {
            label: servico.nome,
            value: servico.idservico,
            preco: parseFloat(servico.preco.replace(/[^0-9\.]+/g,""))
          }
        })
        editarOsState = newEditarState
        OrdemServicoStore.emitChange("fullread")
        break

      case "GET_TIPO_SERVICO":
        tipoServico = dispatchedObj.tipoServico.map(function(servico){
          return {
            value: servico.id,
            label: servico.nome,
            preco: parseFloat(servico.preco.replace(/[^0-9\.]+/g,""))
          }
        })
        OrdemServicoStore.emitChange("rerender")
        break

      case "GET_CLIENTES":
        clientes = dispatchedObj.clientes
        OrdemServicoStore.emitChange("rerender")
        break
      case "GET_VEICULO":
        listaVeiculos = dispatchedObj.veiculos

        OrdemServicoStore.emitChange("rerender")
        break
      case "GET_PECAS":
        listaPecas = dispatchedObj.pecas.map(function(peca){
          return {
            value: peca.idpeca,
            label: peca.nome,
            preco: peca.preco,
            quantidade: peca.quantidade
          }
        })
        OrdemServicoStore.emitChange("rerender")
        break
      case "GET_EQUIPES":
        listaEquipes = dispatchedObj.equipes
        OrdemServicoStore.emitChange("rerender")
        break

      case "GET_HORARIO":
        dispatchedObj.horario.forEach(function(row){
          row.data = moment(row.data).format("YYYY-MM-DD")
        })
        agendaTecnicoData = dispatchedObj.horario
        OrdemServicoStore.emitChange("rerender")
        break;

      default:
    }
  })
})

module.exports = OrdemServicoStore