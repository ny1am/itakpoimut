import React from 'react';

class Checkbox extends React.Component {
	renderCheckbox() {
		return React.cloneElement(
		  this.props.children,
			{id: this.props.id}
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