var pg = require('pg')
var moment = require('moment')
//var client = new pg.Client(connectionString)

var agendarHorarioDAO = function(connectionString, operation, params, callback){
  var stringQuery = ""
  switch(operation){
    case 'create':
      stringQuery = "INSERT INTO tipoServico(nome, preco) values('"
      stringQuery += params.nomeServico
      stringQuery += "', " + params.precoServico + ");"
      break;

    case 'read':
      stringQuery = "SELECT * FROM horarioCliente ORDER BY data DESC;"
      break;

    case 'update':
      stringQuery = "UPDATE tipoServico SET nome=('"
      stringQuery += params.nomeServico+"'), preco=("
      stringQuery += params.precoServico + ") WHERE id=(" + params.id + ")"
      break;

    case 'delete':
      stringQuery = "DELETE FROM tipoServico WHERE id="
      stringQuery += params.id
      break;
  }
  console.log(stringQuery)
  pg.connect(connectionString, function(err, client, done){
    client.query(stringQuery, function(err, results){
      console.log(err)
      console.log(results.rows)
      if(results.rows){
        results.rows.forEach(function(result){
          result.data = moment(result.data).format('YYYY-MM-DD')
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

module.exports = agendarHorarioDAO