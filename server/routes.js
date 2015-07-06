var requireDir = require('require-dir')

var functions = requireDir('./functions', {recursive: true})
// All archives within the functions directory must have a function
// exported (module.exports = function([params]){...}).
// This function needs to return an object that will be passed to the front.
// The routs should call only on function from their callbacks, this call has
// the form: functions.[archiveName]([params])
// The information is then send to the front with a res.json.

module.exports = function(app){

  app.get('/', function(req, res){
    
  })

  app.post('/apiv1/read', function(req, res){
    console.log('/apiv1/read')
    console.log(req.body)
    var table = req.body.table
    var params = req.body.params
    functions.read(table, params, function(err, rows){
      res.send(rows)
    })
  })
}
