app = require('./server/expressServer')
require('./server/routes')(app)
var async = require('async')

// var pg = require('pg')
// var connectionString = process.env.DATABASE_URL || 'postgres://postgres:123@localhost:5432/test'
// var results = []

// pg.connect(connectionString, function(err, client, done){
// 	console.log(err)
// 	var query = client.query("INSERT INTO tipoServico(nome, preco) values('Revisao Anual', 500.50)");
// 	query.on('end', function() { console.log('query end');client.end(); });
// })