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

var MyHeader = React.createClass({
  getDefaultProps: function(){
    return {
      title: ''
    }
  },
  render: function(){
    var style1 = {
      postion: 'center'

      //height: 150
    }
    var title = ''
    if(this.props.title !== '') title = ' - '+this.props.title
    return (
      PageHeader({style: style1}, 'AutoManager'+title)
    );
  }
});

//module.exports = Example;
module.exports = MyHeader;
