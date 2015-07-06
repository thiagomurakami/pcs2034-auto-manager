//Modules
var React                         = require('react')
var Router                        = require('react-router')
var jQuery = require('jquery')

//stores

//services

//styles


//actions


//components
var div = React.createFactory('div')
var p = React.createFactory('p')


//Site


var MainPage = React.createClass({
  render: function() {
    var mathRandom = Math.random()
    return (
      div({className: 'fullContainerBody'}, p({}, 'Hello World! '+mathRandom))
    )
  }
})

React.render(<MainPage />, document.body)