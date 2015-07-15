var React                         = require('react')

// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var div = React.createFactory('div')
var p = React.createFactory('p')
var form = React.createFactory('form')
var input = React.createFactory('input')

var Footer = React.createClass({
  render: function(){
  	var styleObj = {
  		width: '100%',
  		height: '100%',
  		backgroundColor: 'green',
  		clear: 'both'
  	}
    return(
        div({style: styleObj}, p({}, 'Footer'))
        )
  }
})

module.exports = Footer