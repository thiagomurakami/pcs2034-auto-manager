app = require('./server/expressServer')
require('./server/routes')(app)

//var pg = require('pg')
//var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test'
//var results = []
//
//var stringQuery = "BEGIN;"
//stringQuery += "INSERT INTO ordemServico(placaVeiculo, idEquipe, status, dataPrevisao,"
//stringQuery += "dataEmissao) VALUES('ABC-1234', 1, 'pendente', '2015-08-26', '2015-08-17'); "
//stringQuery += "INSERT INTO horarioOS(data, hora, codEquipe, idOs) VALUES('2015-07-14', '15:00', "
//stringQuery += "1 ,currval('ordemServico_id_seq'));"
//stringQuery += "INSERT INTO OSPeca(idOs, idPeca, quantidade) VALUES (currval('ordemServico_id_seq'),"
//stringQuery += "1, 4);"
//stringQuery += "UPDATE peca SET quantidade=quantidade-4 WHERE idPeca=1;"
//stringQuery += "INSERT INTO OSServico(idOs, idServico) VALUES (currval('ordemServico_id_seq'), 1);"
//stringQuery += "COMMIT;"
//console.log(stringQuery)

//pg.connect(connectionString, function(err, client, done){
//  client.query(stringQuery, function(err, results){
//    console.log(err)
//    console.log(results)
//
//    done()
//  })
//})