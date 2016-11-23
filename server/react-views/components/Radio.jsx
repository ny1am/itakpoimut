import React from 'react';

class Radio extends React.Component {
	renderRadio() {
		return React.createElement(
			'input',
			Object.assign({type: 'radio'}, this.props)
		)
	}
	render() {
		return (
			<div className="radio">
				{this.renderRadio()}
				<label htmlFor={this.props.id}></label>
			</div>
		);
	}
}

export default Radio;