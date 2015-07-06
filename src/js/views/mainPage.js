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
var Form = React.createFactory(require('./form.js'))

//Site

var Example = React.createClass({
  render: function(){
    return(
        p({}, 'Exemplo')
      )
  }
})
var MainPage = React.createClass({
  render: function() {
    var mathRandom = Math.random()
    return (
      div({className: 'fullContainerBody'}, 
        Form())
    )
  }
})


React.render(<MainPage />, document.body)