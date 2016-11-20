import React from 'react';

import Layout from '../layouts/Admin';
import Pagination from '../components/Pagination.jsx';
import roleAdmin from '../helpers/roleAdmin';
import roleModerator from '../helpers/roleModerator';

class AdminUsersPage extends React.Component {
	renderUserActions(user) {
		if (roleAdmin(user)) {
			return (
				<div className="admin-row-proposed">
					admin
				</div>
			)
		} else {
			if (roleModerator(user)) {
				return [
					<div className="admin-row-proposed">
						moderator
					</div>,
					<div>
						<a href={"admin/removeModeratorRole?id="+user._id}>
							Забрати можливість модерувати
						</a>
					</div>
				]
			} else {
				return [
					<div className="admin-row-proposed">
						user
					</div>,
					<div>
						<a href={"admin/addModeratorRole?id="+user._id}>
							Надати можливість модерувати
						</a>
					</div>
				]
			}
		}
	}
	renderUsers() {
		return this.props.users.map(user => (
			<div className="admin-row">
				<div className="admin-row-proposed">
					{user.email}
				</div>
				<div>
					{user.username}
				</div>
				<div>
					{user.fname}
				</div>
				<div>
					{user.lname}
				</div>
				{this.renderUserActions(user)}
			</div>
		));
	}
	render() {
		return (
			<Layout page_url={this.props.page_url} loggedUser={this.props.loggedUser}>
				{this.renderUsers()}
				<Pagination currentPage={this.props.currentPage} totalPages={this.props.totalPages}>
					<a href="/admin/users?currentPage={{page}}"/>
				</Pagination>
			</Layout>
		);
	}
}

AdminUsersPage.defaultProps = {
	users: [],
	currentPage: 1,
	totalPages: 0
}

export default AdminUsersPage;