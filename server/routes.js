var requireDir = require('require-dir')
var request = require('request')

var functions = requireDir('./functions', {recursive: true})
var dao = requireDir('./dao', {recursive: true})
var connectionString = process.env.DATABASE_URL || 'postgres://@localhost:5432/test'

// All archives within the functions directory must have a function
// exported (module.exports = function([params]){...}).
// This function needs to return an object that will be passed to the front.
// The routs should call only on function from their callbacks, this call has
// the form: functions.[archiveName]([params])
// The information is then send to the front with a res.json.

module.exports = function(app){

  app.post('/login', function(req, res){
    functions.login(connectionString, req.body, function(err, loginData){
      console.log(err)
      console.log(loginData)
      var responseObj = {
        err: err,
        data: loginData
      }
      res.send(responseObj)
    })
  })

  app.post('/apiv1/read', function(req, res){
    var body = req.body
    dao[body.table](connectionString, 'read', {}, function(err, rows){
      res.send(rows)
    })
  })

  app.post('/apiv1/create', function(req, res){
    var body = req.body
    dao[body.table](connectionString, 'create', body.values, function(err){
      res.send(err)
    })
  })

  app.post('/apiv1/delete', function(req, res){
    var body = req.body
    dao[body.table](connectionString, 'delete', body.values, function(err){
      res.send(err)
    })
  })

  app.post('/apiv1/update', function(req, res){
    console.log(dao)
    var body = req.body
    dao[body.table](connectionString, 'update', body.values, function(err){
      res.send(err)
    })
    console.log('update')
    console.log(body)
  })

  app.get('/apiv1/clientes', function(req, res){
    functions.clientes(connectionString, function(err, clientes){
      res.send(clientes)
    })
  })

  app.get('/apiv1/gerentes', function(req, res){
    functions.gerentes(connectionString, function(err, gerentes){
      res.send(gerentes)
    })
  })

  app.get('/apiv1/tecnicos', function(req, res){
    functions.tecnicos(connectionString, function(err, gerentes){
      res.send(gerentes)
    })
  })

  app.get('/apiv1/pecas', function(req, res){
    functions.pecasDisponiveis(connectionString, function(err, pecas){
      res.send(pecas)
    })
  })

  app.get('/apiv1/tipoServico', function(req, res){
    functions.tiposDeServico(connectionString, function(err, tiposServicos){
      res.send(tiposServicos)
    })
  })

  app.get('/apiv1/horarios/:date', function(req, res){
    var date = req.params.date
    functions.horariosDisponiveis(connectionString, date, function(err, horariosDisponiveis){
      res.send(horariosDisponiveis)
    })
  })

  app.get('/apiv1/veiculo/:idCliente', function(req, res){
    var idCliente = req.params.idCliente
    functions.getVeiculos(connectionString, idCliente, function(err, listaVeiculos){
      res.send(listaVeiculos)
    })
  })

  app.get('/apiv1/cep/:cepNumber', function(req, res){
    var uri = 'http://api.postmon.com.br/v1/cep/'+req.params.cepNumber
    request({
      method: 'GET',
      url: uri,
      rejectUnauthorized : false,
      headers : {
      'Content-Type' : 'application/json'
      }
    }, function(err, requestRes, body){
      var type = ''+requestRes.headers['content-type']
      if(type.indexOf('json') !== -1){
        res.json(body)
      }
        else console.log(err)
    })
  })

  app.get('/apiv1/sugestaoEquipes/:date', function(req, res){
    functions.sugerirEquipe(connectionString, req.params.date, function(err, sugestao){
      res.send(sugestao)
    })
  })

  app.post('/apiv1/criarOs', function(req, res){
    var body = req.body.values
    functions.criarOs(connectionString, body, function(err, results){

    })
  })

}