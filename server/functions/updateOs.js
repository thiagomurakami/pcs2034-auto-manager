var pg = require('pg')
var u = require('underscore')
var async = require('async')
var moment = require('moment').utc

var updateFullOs = function(connectionString, body, callback){
  var idOs = body.id
  var previousState = body.previousState
  var newState = body.newState
  var previousPecas = previousState.pecas
  var newPecas = newState.pecas
  newState = u.omit(newState, 'pecas', 'servicosSelecionados')
  previousState = u.omit(newState, 'pecas', 'servicosSelecionados')
  async.series([
    function(cb){
      var stringQuery = ''
      if(!u.isEqual(newState, previousState)){
        var keys = u.keys(newState)
        var updateString = keys.map(function(key){
          return key+"=('"+newState[key]+"')"
        })
        stringQuery = "UPDATE ordemServico SET " + updateString.join()
        stringQuery += " WHERE id=("+idOs+")"
        pg.connect(connectionString, function(err, client, done){
          client.query(stringQuery, function(err, results){
            if(!err){
              cb(null, results.rows)
            }
            else cb(err)
            done()
          })
        })
      } else {
        cb(null)
      }
    },

    function(cb){
      var stringQuery = "BEGIN;"
      if(!u.isEqual(newPecas, previousPecas)){
        var pecasAdicionar = u.filter(newPecas, function(peca){
          var adicionar = true
          previousPecas.forEach(function(prevPeca){
            if(prevPeca.idpeca == peca.idpeca) adicionar = false
          })
          return adicionar
        })
        var pecasAlterar = u.reject(newPecas, function(peca){
          var adicionar = true
          previousPecas.forEach(function(prevPeca){
            if(prevPeca.idpeca == peca.idpeca) adicionar = false
          })
          return adicionar
        })
        pecasAlterar.forEach(function(pecaAlterar){
          var delta = 0
          previousPecas.forEach(function(peca){
            if(peca.idpeca == pecaAlterar.idpeca) {
              delta = pecaAlterar.quantidade - peca.quantidade
            }
          })
          stringQuery += "UPDATE osPeca SET quantidade="+pecaAlterar.quantidade + " where (idOs, idPeca) = "
          stringQuery += "(" + idOs + "," + pecaAlterar.idpeca + ");"
          delta =  (delta <= 0) ? "+"+delta*-1 : delta*-1
          stringQuery += "UPDATE peca SET quantidade=quantidade" + delta
          stringQuery += " WHERE idPeca=" + pecaAlterar.idpeca + ";"

        })
        pecasAdicionar.forEach(function(peca){
          stringQuery += "INSERT INTO osPeca(idOs, idPeca, quantidade) VALUES (" + idOs + ", "
          stringQuery += peca.idpeca + "," + peca.quantidade + ");"
          stringQuery += "UPDATE peca SET quantidade=quantidade-" + peca.quantidade + " WHERE idPeca=" + peca.idpeca + ";"
        })
        stringQuery += "COMMIT;"
        pg.connect(connectionString, function(err, client, done){
          client.query(stringQuery, function(err, results){
            if(!err){
              cb(null, results.rows)
            }
            else cb(err)
            done()
          })
        })
      }
      else {
        cb(null)
      }
    }

  ], function(err, results){
    callback(err, results)
  })
}

module.exports = updateFullOs