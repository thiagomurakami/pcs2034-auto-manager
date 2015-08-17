var pg = require('pg')
var u = require('underscore')
var async = require('async')
var moment = require('moment').utc

var criarOs = function(connectionString, body, callback){
  var pecas = body.pecas || []
  var servicosSelecionados = body.servicosSelecionados || []
  var dataExecucao = body.dataExecucao
  var horaExecucao = body.horaExecucao+":00"
  var idEquipe = body.idequipe
  body = u.omit(body, 'pecas', 'servicosSelecionados', 'dataExecucao', 'horaExecucao', 'idEquipe')
  var keys = u.keys(body)
  var values = u.values(body).map(function(value){
    return "'"+value+"'"
  })
  var stringQuery = "BEGIN;"
  stringQuery += "INSERT INTO ordemServico ("+keys.join()+") "
  stringQuery += "VALUES ("+values.join()+");"
  stringQuery += "INSERT INTO horarioOs(data, hora, codEquipe, idOs) VALUES ('"+dataExecucao+"', '"+horaExecucao+"', '"
  stringQuery += idEquipe+"', currval('ordemServico_id_seq'));"
  pecas.forEach(function(peca){
    stringQuery += "INSERT INTO osPeca(idOs, idPeca, quantidade) VALUES (currval('ordemServico_id_seq'), "
    stringQuery += peca.idpeca+","+peca.quantidade+");"
    stringQuery += "UPDATE peca SET quantidade=quantidade-"+peca.quantidade+" WHERE idPeca="+peca.idpeca+";"
  })
  servicosSelecionados.forEach(function(servico){
    stringQuery += "INSERT INTO OSServico(idOs, idServico) VALUES (currval('ordemServico_id_seq'), "+servico.value+");"
  })
  stringQuery += "COMMIT;"
  console.log(stringQuery)
  pg.connect(connectionString, function(err, client, done){
    client.query(stringQuery, function(err, results){
      console.log(err)
      console.log(results)
      if(!err){
        callback(null, results.rows)
      }
      else callback(err)
      done()
    })
  })
}

module.exports = criarOs