import React from 'react';
import isServerRenderer from '../helpers/isServerRenderer';

class Password extends React.Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {hidden: true}
	}

	toggle() {
		this.setState({hidden: !this.state.hidden});
	}

	renderToggleElement() {
		if (isServerRenderer) {
			return null
		} else {
			const toggleClassName = 'password-toggle' + (this.state.hidden?'':' shown');
			return (
				<div className={toggleClassName} title={this.state.hidden?'Показати пароль':'Сховати пароль'} onClick={this.toggle}></div>
			)
		}
	}

	render() {
		return (
			<div className='password-holder'>
				<input {...this.props} type={this.state.hidden?'password':'text'} />
				{this.renderToggleElement()}
			</div>
		);
	}
}

export default Password;