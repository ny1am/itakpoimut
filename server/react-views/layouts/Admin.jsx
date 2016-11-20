import React from 'react';
import MainLayout from './Main';

import roleAdmin from '../helpers/roleAdmin';

class AdminLayout extends React.Component {
	renderAdminLinks() {
		if (roleAdmin(this.props.loggedUser)) {
			return (
				<li>
					<a href="/admin/users">Користувачі</a>
				</li>
			)
		} else {
			return null;
		}
	}
	render() {
		return (
			<MainLayout loggedUser={this.props.loggedUser} page_url={this.props.page_url} bodyClass="site" dialog={false}>
				<nav className="admin-menu">
					<div className="container">
						<ul>
							<li>
								<a href="/admin/companies">Компанії</a>
							</li>
							{this.renderAdminLinks()}
						</ul>
					</div>
				</nav>
				<div className="container admin-container">
					{this.props.children}
				</div>
			</MainLayout>
		);
	}
}

export default AdminLayout;