var pg = require('pg')
var u = require('underscore')
var async = require('async')
var moment = require('moment').utc

var readFullOs = function(connectionString, id, callback){
  async.series([
    function(cb){
      var stringQuery = "select * from ordemservico where id="+id
      pg.connect(connectionString, function(err, client, done){
        client.query(stringQuery, function(err, results){
          if(!err){
            cb(null, results.rows)
          }
          else cb(err)
          done()
        })
      })
    },
    function(cb){
      var stringQuery = "select * from horarioOs where idos="+id
      pg.connect(connectionString, function(err, client, done){
        client.query(stringQuery, function(err, results){
          if(!err){
            cb(null, results.rows)
          }
          else cb(err)
          done()
        })
      })
    },
    function(cb){
      var stringQuery = "select ospeca.idos, ospeca.idpeca, ospeca.quantidade, peca.nome, peca.preco, peca.quantidade "
      stringQuery += "as quantidadetotal from ospeca inner join peca using (idpeca) where idos="+id
      pg.connect(connectionString, function(err, client, done){
        client.query(stringQuery, function(err, results){
          if(!err){
            cb(null, results.rows)
          }
          else cb(err)
          done()
        })
      })
    },

    function(cb){
      var stringQuery = "select * from osservico inner join tiposervico on osservico.idservico = tiposervico.id where idos="
      stringQuery += id
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
  ], function(err, results){
    callback(err, results)
  })
}

module.exports = readFullOs