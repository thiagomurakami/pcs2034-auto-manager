var React = require('react')

var notFound = React.createClass({
	render: function(){
		console.log(this.props)
		var errorMessage = "404: Page '"+this.props.params.splat+"'"
		errorMessage += " Not Found."
		return(
			<h5> {errorMessage} </h5>)
	}
})

module.exports = notFound