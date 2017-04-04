import React from 'react';

class Checkbox extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {checked: props && props.defaultChecked};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.checked !== this.props.checked) {
			this.setState({checked: nextProps.checked});
		}
	}

	handleChange(el) {
		if (this.props && this.props.onChange) {
			this.props.onChange(el);
		}
		this.setState({checked: el.target.checked});
	}

	render() {
		return (
			<div className="checkbox" {...this.state.checked?{'data-checked':''}:{}}>
				<input type="checkbox" {...this.props} onChange={this.handleChange}/>
				<label htmlFor={this.props.id}></label>
			</div>
		);
	}
}

export default Checkbox;