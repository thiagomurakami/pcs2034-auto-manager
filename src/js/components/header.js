var React                         = require('react')

// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var div = React.createFactory('div')
var p = React.createFactory('p')
var form = React.createFactory('form')
var input = React.createFactory('input')

var Example = React.createClass({
  render: function(){
  	var styleObj = {
  		width: '100%',
  		height: 100,
  		backgroundColor: 'red',
  		float: 'left'
  	}
    return(
        div({style: styleObj}, p({}, 'Header 1'))
        )
  }
})

module.exports = Example