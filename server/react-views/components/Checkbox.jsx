import React from 'react';

class Checkbox extends React.Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {checked: props.defaultChecked || props.checked};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.defaultChecked !== this.props.defaultChecked) {
			this.setState({checked: nextProps.defaultChecked});
		} else if (nextProps.checked !== this.props.checked) {
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
				<input type="checkbox" {...this.props} checked={this.state.checked} onChange={this.handleChange}/>
				<label htmlFor={this.props.id}></label>
			</div>
		);
	}
}

export default Checkbox;