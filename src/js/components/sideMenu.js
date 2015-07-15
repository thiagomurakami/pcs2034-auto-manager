var React                         = require('react')

// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var div = React.createFactory('div')
var p = React.createFactory('p')
var form = React.createFactory('form')
var input = React.createFactory('input')

var SideMenu = React.createClass({
  render: function(){
  	var styleObj = {
  		width: 150,
  		height: '100%',
  		backgroundColor: 'blue',
  		float: 'left'
  	}
    return(
        div({style: styleObj}, p({}, 'Side Menu 1'))
        )
  }
})

module.exports = SideMenu