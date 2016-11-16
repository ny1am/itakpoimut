import React from 'react';

import avatar from '../../helpers/avatar';

class DesktopHeader extends React.Component {
	renderUserLinks() {
		const loggedUser = this.props.loggedUser;
		if (loggedUser) {
			return [
				<a href="/userProfile">
					<img className="header-userpic" src={avatar(loggedUser.picture_url, 48)} />
				</a>,
				<a href="/userProfile" className="header-name">
					{loggedUser.fname}
				</a>,
				<a href="/logout" className="header-logout"></a>
			]
		} else {
			return (
				<a href="/login" className="header-login" data-ajax-dialog="login">
					Вхід/Реєстрація
				</a>
			)
		}
	}
	render() {
		return (
			<header className="desktop-header">
				<div className="container">
					<a className="header-logo" href="/">
						<q>И так поймут</q> каталог <abbr title="Засоби масової інформації">ЗМІ</abbr> та бізнесу
					</a>
					<div className="header-right">
						{this.renderUserLinks()}
					</div>
				</div>
			</header>
		);
	}
}

export default DesktopHeader;