import React, {Component} from 'react';

import avatar from '../../helpers/avatar';

class MobileHeader extends Component {
	renderUserLinks() {
		const loggedUser = this.props.loggedUser;
		if (loggedUser) {
			return [
				<a href="/userProfile" className="mobile-user"></a>,
				<a href="/logout" className="mobile-logout"></a>
			]
		} else {
			return (
				<a href="/login" data-ajax-dialog="login" className="mobile-user"></a>
			)
		}
	}
	render() {
		return (
			<header className="mobile-header">
				<a href={this.props.page_url+"#mobile-menu"} className="menu-button"></a>
				<div className="mobile-header-buttons">
					<a href="/createCompany" className="mobile-add-company" data-ajax-dialog="createCompany" data-ajax-url="/createCompany"></a>
					<a href="/companies" className="mobile-search"></a>
					{this.renderUserLinks()}
				</div>
			</header>
		);
	}
}

export default MobileHeader;