var React                         = require('react')
var Input = require('react-bootstrap').Input
var ButtonInput = require('react-bootstrap').ButtonInput
var div = React.createFactory('div')
var p = React.createFactory('p')
var input = React.createFactory('input')
var jajax = require('jquery').ajax

var Example = React.createClass({
  _log: function(e){
  	console.log(e)
    console.log("click")
    var body = {
      table: 'items',
      params: ['*']
    }
    jajax({
      url: '/apiv1/read',
        type: 'POST',
        data: JSON.stringify(body),
        contentType: 'application/json'
    }).done(function(res){
      console.log(res)
    })
  },
  render: function(){
    return(
        div({onClick: this._log}, input({type: 'button'}, p({}, 'teste')))
      )
  }
})

module.exports = Example