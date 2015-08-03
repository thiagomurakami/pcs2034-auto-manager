var requireDir = require('require-dir')
var request = require('request')

var functions = requireDir('./functions', {recursive: true})
var dao = requireDir('./dao', {recursive: true})
// All archives within the functions directory must have a function
// exported (module.exports = function([params]){...}).
// This function needs to return an object that will be passed to the front.
// The routs should call only on function from their callbacks, this call has
// the form: functions.[archiveName]([params])
// The information is then send to the front with a res.json.

module.exports = function(app){

  app.post('/login', function(req, res){
    console.log('login')
    console.log(req.body)
    functions.login(req.body, function(err, loginData){
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
    console.log('/apiv1/read')
    console.log(req.body)
    var body = req.body
    dao[body.table]('read', '', function(err, rows){
      res.send(rows)
    })
  })

  app.post('/apiv1/create', function(req, res){
    var body = req.body
    dao[body.table]('create', body.values, function(err){
      res.send(err)
    })
    console.log('create')
    console.log(body)
  })

  app.post('/apiv1/delete', function(req, res){
    console.log(dao)
    var body = req.body
    dao[body.table]('delete', body.values, function(err){
      res.send(err)
    })
    console.log('delete')
    console.log(body)
  })

  app.post('/apiv1/update', function(req, res){
    console.log(dao)
    var body = req.body
    dao[body.table]('update', body.values, function(err){
      res.send(err)
    })
    console.log('update')
    console.log(body)
  })

  app.get('/apiv1/clientes', function(req, res){
    functions.clientes(function(err, clientes){
      res.send(clientes)
    })
  })

  app.get('/apiv1/horarios/:date', function(req, res){
    var date = req.params.date
    functions.horariosDisponiveis(date, function(err, horariosDisponiveis){
      res.send(horariosDisponiveis)
    })
  })

  app.get('/apiv1/cep/:cepNumber', function(req, res){
    var uri = 'http://api.postmon.com.br/v1/cep/'+req.params.cepNumber
    console.log(uri)
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
}