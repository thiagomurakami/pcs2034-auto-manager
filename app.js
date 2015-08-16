app = require('./server/expressServer')
require('./server/routes')(app)
var async = require('async')

var pg = require('pg')
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test'
var results = []

var stringQuery = "BEGIN;"
stringQuery += "INSERT INTO tipoServico(nome, preco) VALUES('Revisao 60 mil km', 249.99) "
stringQuery += "RETURNING id;"
stringQuery += "COMMIT;"
pg.connect(connectionString, function(err, client, done){
  client.query(stringQuery, function(err, results){
    console.log(err)
    console.log(results)

    done()
  })
})