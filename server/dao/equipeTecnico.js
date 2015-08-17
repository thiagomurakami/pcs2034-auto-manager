var pg = require('pg')
var u = require('underscore')
//var client = new pg.Client(connectionString)

var equipeDao = function(connectionString, operation, params, callback){
  var stringQuery = ""
  params = u.omit(params, function(value, key, object){
    return u.isUndefined(value) || u.isNull(value)
  })
  var keys = u.keys(params)
  var values = u.values(params).map(function(value){
    if(u.isNumber(value)) return value
    return "'"+value+"'"
  })
  switch(operation){
    case 'create':
      stringQuery = "INSERT INTO equipeTecnico ("+keys.join()+")"
      stringQuery += " VALUES ("+values.join()+");"

      break;

    case 'read':
      stringQuery = "SELECT * FROM equipeTecnico ORDER BY idequipe ASC;"
      break;

    case 'update':
      keys = u.without(keys, 'idequipe')
      var updateString = keys.map(function(key){
        return key+"=('"+params[key]+"')"
      })
      stringQuery = "UPDATE equipeTecnico SET " + updateString.join()
      stringQuery += " WHERE idequipe=("+params.idequipe+")"
      break;

    case 'delete':
      stringQuery = "DELETE FROM equipeTecnico WHERE idequipe="
      stringQuery += params.idequipe
      break;
  }
  console.log(stringQuery)
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

module.exports = equipeDao