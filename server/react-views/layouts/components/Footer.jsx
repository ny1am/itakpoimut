import React from 'react';

import MenuItems from './MenuItems.jsx';

class Footer extends React.Component {
	render() {
		return (
			<footer>
				<div className="container">
					<nav>
						<MenuItems className="footer-menu" loggedUser={this.props.loggedUser}/>
					</nav>
					<div className="footer-helpers">
						<a href="https://www.facebook.com/groups/i.tak.poymut" target="_blank" title="facebook" className="facebook"></a>
						<a href={this.props.page_url+"#top"} title="Нагору" className="up"></a>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;