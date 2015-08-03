var React                         = require('react')

var LoginActions = require('../actions/loginActions')

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

var Link = React.createFactory(require('react-router').Link)

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
  _logOut: function(e){
    e.preventDefault()
    LoginActions.logout()
  },
  render: function(){
    var links = this.props.links.map(function(link, index){
      return NavItem({href: link.path, key: "admin-link-"+index}, link.label)
    })
    return(
      Navbar({},
        Nav({},
          links,
          NavItem({onClick: this._logOut}, "Log Out")
        )

      )
    )
  }
})




module.exports = SideMenu