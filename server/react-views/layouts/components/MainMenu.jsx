import React, {Component} from 'react';

import MenuItems from './MenuItems';

class MainMenu extends Component {
	render() {
		return (
			<nav className="main-menu">
				<div className="container menu-container">
					<MenuItems className="menu" loggedUser={this.props.loggedUser}/>
					<div className="menu-right">
						<a className="search-ico" href="/companies"></a>
						<button className="simple" data-ajax-dialog="createCompany" data-ajax-url="/createCompany">
							Додати компанію
						</button>
					</div>	
				</div>
			</nav>
		);
	}
}

export default MainMenu;