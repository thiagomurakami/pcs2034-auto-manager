var React                         = require('react')

// Components
var Input = React.createFactory(require('react-bootstrap').Input)
var ButtonInput = React.createFactory(require('react-bootstrap').ButtonInput)
var div = React.createFactory('div')
var p = React.createFactory('p')
var form = React.createFactory('form')
var input = React.createFactory('input')

//--------------------------------
var h1 = React.createFactory('h1');
var h2 = React.createFactory('h2');

//var br = React.createFactory('br');

var PageHeader = React.createFactory(require('react-bootstrap').PageHeader)
//var well = React.createFactory(require('react-bootstrap').Well)
/*
var Example = React.createClass({
  render: function(){
  	var styleObj = {
  		width: '100%',
  		height: 200,
  		backgroundColor: '#6495ed',
      position: 'right',
      float: 'right'
  	}
    return(
        div({style: styleObj}, h2({}, 'Header 1' , 'hello'),br(), h2({}, 'oioi'))

       )
  }
})
*/
var MyHeader = React.createClass({
    render: function(){
      var style1 = {
        postion: 'center'        
        
        //height: 150
      }
        return (
            PageHeader({style: style1}, 'AutoManager')  
        );
    }
});

//module.exports = Example;
module.exports = MyHeader;
