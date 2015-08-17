var pg = require('pg')
var u = require('underscore')
//var client = new pg.Client(connectionString)

var pecaDAO = function(connectionString, operation, params, callback){
  var stringQuery = ""
  params = u.omit(params, function(value, key, object){
    return u.isUndefined(value) || u.isNull(value)
  })
  var keys = u.keys(params)
  var values = u.values(params).map(function(value){
    return "'"+value+"'"
  })
  switch(operation){
    case 'read':
      stringQuery = "SELECT * FROM ordemservico ORDER BY id ASC;"
      break;

    case 'update':
      break;

    case 'delete':
      break;
  }
  console.log(stringQuery)
  pg.connect(connectionString, function(err, client, done){
    client.query(stringQuery, function(err, results){
      console.log(results.rows)
      if(!err){
        callback(null, results.rows)
      }
      else callback(err)
      done()
    })
  })
}

module.exports = pecaDAO/**
 * Created by thiagomurakami on 8/16/15.
 */
