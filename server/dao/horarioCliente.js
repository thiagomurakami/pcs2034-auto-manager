var pg = require('pg')
var moment = require('moment')
var u = require('underscore')
var jquery = require('jquery')
//var client = new pg.Client(connectionString)

var agendarHorarioDAO = function(connectionString, operation, params, callback){
  var stringQuery = ""
  params = u.omit(params, function(value, key, object){
    return u.isUndefined(value) || u.isNull(value)
  })
  var keys = u.keys(params)
  var values = u.values(params).map(function(value){
    return "'"+value+"'"
  })
  var updateString
  switch(operation){
    case 'create':
      stringQuery = "INSERT INTO horarioCliente("+keys.join()+")"
      stringQuery += " VALUES ("+values.join()+");"
      break;

    case 'read':
      stringQuery = "SELECT * FROM horarioCliente ORDER BY data DESC;"
      break;

    case 'update':
      updateString = keys.map(function(key){
        return key+"=('"+params[key]+"')"
      })
      stringQuery = "UPDATE horarioCliente SET " + updateString.join()
      stringQuery += " WHERE " + updateString.join()
      break;

    case 'delete':
      updateString = keys.map(function(key){
        return key+"=('"+params[key]+"')"
      })
      stringQuery = "DELETE FROM horarioCliente WHERE ("+keys.join()+") = ("
      stringQuery += values.join() + ")"
      break;
  }
  if(operation != 'update'){
    pg.connect(connectionString, function(err, client, done){
      client.query(stringQuery, function(err, results){
        if(results.rows){
          results.rows.forEach(function(result){
            result.data = moment(result.data).format('YYYY-MM-DD')
            result.hora = result.hora.substring(0, 5)
          })
        }
        if(!err){
          callback(null, results.rows)
        }
        else callback(err)
        done()
      })
    })
  }
}

module.exports = agendarHorarioDAO