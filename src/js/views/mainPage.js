//Modules
var React                         = require('react')
var Router                        = require('react-router')
var jQuery = require('jquery')
var jajax = require('jquery').ajax

//stores

//services


//styles


//actions


//components
var div = React.createFactory('div')
var p = React.createFactory('p')
var input = React.createFactory('input')
var createUser = React.createFactory(require('./createUser.js'))

//Site

var MainPage = React.createClass({
  render: function() {
    var mathRandom = Math.random()
    return (
      div({className: 'fullContainerBody'}, 
        createUser())
    )
  }
})


React.render(<MainPage />, document.body)