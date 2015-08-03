var pg = require('pg')
var u = require('underscore')
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test'
//var client = new pg.Client(connectionString)

var veiculoDAO = function(operation, params, callback){
  console.log(operation)
  console.log(params)
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
      stringQuery = "INSERT INTO veiculo ("+keys.join()+")"
      stringQuery += " VALUES ("+values.join()+");"

      break;

    case 'read':
      stringQuery = "SELECT * FROM veiculo ORDER BY dono ASC;"
      break;

    case 'update':
      keys = u.without(keys, 'dono')
      var updateString = keys.map(function(key){
        return key+"=('"+params[key]+"')"
      })
      stringQuery = "UPDATE veiculo SET " + updateString.join()
      stringQuery += " WHERE dono=("+params.dono+")"
      break;

    case 'delete':
      stringQuery = "DELETE FROM veiculo WHERE dono="
      stringQuery += params.dono
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

module.exports = veiculoDAO