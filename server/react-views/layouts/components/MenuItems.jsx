import React, {Component} from 'react';

import roleModerator from '../../helpers/roleModerator.jsx';

class MenuItems extends Component {
	renderModeratorLinks() {
		if (roleModerator(this.props.loggedUser)) {
			return (
				<li>
					<a href="/admin">
						Адмінка
					</a>
				</li>
			)
		} else {
			return null;
		}
	}
	render() {
		return (
			<ul className={this.props.className}>
				<li>
					<a href="/">
						Головна
					</a>
				</li>
				<li>
					<a href="/companies">
						Всі компанії
					</a>
				</li>
				<li>
					<a href="/about">
						Про нас
					</a>
				</li>
				{this.renderModeratorLinks()}
			</ul>
		)
	}
}

export default MenuItems;