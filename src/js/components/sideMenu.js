var React                         = require('react')

// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var div = React.createFactory('div')
var p = React.createFactory('p')
var form = React.createFactory('form')
var input = React.createFactory('input')

var Navbar = React.createFactory(require('react-bootstrap').Navbar)
var Nav = React.createFactory(require('react-bootstrap').Nav)
var NavItem = React.createFactory(require('react-bootstrap').NavItem)
/*
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
*/

var SideMenu = React.createClass({
  render: function(){
    var style1 = {
      
    }
    return(
        Navbar({}, 
          Nav({},  
            NavItem({ href: 'http://www.google.com'} , 'link1'),
            NavItem({} , 'link2'),
            NavItem({} , 'link3')
            )

          )
        )
  }
})




module.exports = SideMenu