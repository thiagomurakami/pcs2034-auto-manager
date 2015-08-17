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
    case 'create':
      stringQuery = "INSERT INTO peca ("+keys.join()+")"
      stringQuery += " VALUES ("+values.join()+");"

      break;

    case 'read':
      stringQuery = "SELECT * FROM peca ORDER BY idpeca ASC;"
      break;

    case 'update':
      keys = u.without(keys, 'idpeca')
      var updateString = keys.map(function(key){
        return key+"=('"+params[key]+"')"
      })
      stringQuery = "UPDATE peca SET " + updateString.join()
      stringQuery += " WHERE idpeca=("+params.idpeca+")"
      break;

    case 'delete':
      stringQuery = "DELETE FROM peca WHERE idpeca="
      stringQuery += params.idpeca
      break;
  }
  pg.connect(connectionString, function(err, client, done){
    client.query(stringQuery, function(err, results){
      if(!err){
        callback(null, results.rows)
      }
      else callback(err)
      done()
    })
  })
}

module.exports = pecaDAO