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
  	//	width: '100%',
  	//	height: '50%',
  	//	backgroundColor: 'green',
  		clear: 'both',
      float: 'center'
      //fontAlign: 'center',
      //fontSize: 12
      //bsSize: 'small'
      }
    return(
        Well({style: styleObj}, 
          p({}, 'Sistema Auto Manager - PCS2034')
          )
        )
  }
})

/*
var teste= React.createClass({
  render: function(){
    var style1 = {
      postion: 'center',
      fontSize: '23',
      fontColor: 'blue'
    }
    return(
      div({className: 'blablabla'}, p({style: style1}, 'a new para'))
      )
  }  
})
*/
module.exports = Footer