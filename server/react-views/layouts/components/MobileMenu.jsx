import React, {Component} from 'react';

import MenuItems from './MenuItems.jsx';

class MobileMenu extends Component {
	render() {
		return (
			<section id="mobile-menu" className="mobile-menu">
				<header className="mobile-menu__header">
					<a href={this.props.page_url+"#"} className="close"></a>
					<h1>
						<q>И так поймут</q> каталог <abbr title="Засоби масової інформації">ЗМІ</abbr> та бізнесу
					</h1>
				</header>
				<nav className="mobile-main-menu">
					<MenuItems className="mobile-main-menu" loggedUser={this.props.loggedUser}/>
				</nav>
			</section>
		);
	}
}

export default MobileMenu;