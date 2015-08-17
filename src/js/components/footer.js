var React                         = require('react')

// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var div = React.createFactory('div')
var p = React.createFactory('p')
var h3 = React.createFactory('h3')
var form = React.createFactory('form')
var input = React.createFactory('input')

var Well = React.createFactory(require('react-bootstrap').Well)

var Footer = React.createClass({
  render: function(){
  	var styleObj = {
  		clear: 'both',
      float: 'center'
      }
    return(
        Well({style: styleObj}, 
          p({}, 'Sistema Auto Manager - PCS2034')
          )
        )
  }
})

module.exports = Footer