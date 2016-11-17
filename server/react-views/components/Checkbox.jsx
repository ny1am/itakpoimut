import React from 'react';

class Checkbox extends React.Component {
	renderCheckbox() {
		return React.createElement(
			'input',
			Object.assign({type: 'checkbox'}, this.props)
		)
	}
	render() {
		return (
			<div className="checkbox">
				{this.renderCheckbox()}
				<label htmlFor={this.props.id}></label>
			</div>
		);
	}
}

export default Checkbox;