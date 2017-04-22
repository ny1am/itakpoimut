import React from 'react';

import isServerRenderer from '../helpers/isServerRenderer';

class ShowHideWrapper extends React.Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.changeVisibility = this.changeVisibility.bind(this);
		this.prepareVisibility = this.prepareVisibility.bind(this);
		
		let hidden = true;
		this.state = {
			hidden,
			visibility: this.prepareVisibility(hidden)
		}
	}

	toggle() {
		this.setState({hidden: !this.state.hidden}, this.changeVisibility);
	}

	changeVisibility() {
		this.setState({visibility: this.prepareVisibility(this.state.hidden)});
	}

	//todo: no more then props.size; currently in may show {size+1}
	prepareVisibility(hidden) {
		let visibility = {}
		if (hidden) {
			this.props.children.map((item, index) => {
				visibility[item.key] = (index<this.props.size || item.props.checked)
			})
		} else {
			this.props.children.map((item) => {
				visibility[item.key] = true
			})
		}
		return visibility;
	}

	renderToggleElement() {
		const toggleClassName = 'js-sm-trigger ' + (!this.state.hidden?'open':'close');
		return (
			<div className={toggleClassName} onClick={this.toggle}></div>
		)
	}

	//todo: revise this
	render() {
		if (isServerRenderer) {
			return (
				<div>
					<ul className="search-chk-group">
						{this.props.children.map((item) => (
							<li className="row">
								{item}
							</li>
						))}
					</ul>
				</div>
			)
		} else {
			return (
				<div>
					<ul className="search-chk-group">
						{this.props.children.map((item) => (
							<li className={"row"+(!this.state.visibility[item.key]?" hidden":"")}>
								{item}
							</li>
						))}
					</ul>
					{this.renderToggleElement()}
				</div>
			)
		}
	}

}

export default ShowHideWrapper;