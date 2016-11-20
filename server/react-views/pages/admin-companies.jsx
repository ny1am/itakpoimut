import React from 'react';

import Layout from '../layouts/Admin';
import AdminCompanySearchResults from '../partials/admin-companies_searchResults.jsx';

class AdminCompaniesPage extends React.Component {
	render() {
		return (
			<Layout page_url={this.props.page_url} loggedUser={this.props.loggedUser}>
				<div className="admin-action">
					<a href="/admin/company">
						Додати компанію
					</a>
				</div>
				<form action="/admin/companies" method="post" data-ajax-zone="search-results" data-ajax-tmpl="admin-companies_searchResults">
					<div className="search-construct search-construct--highlight" style={{marginBottom: 50}}>
						<div className="search-construct-input">
							<input type="text" name="title" placeholder="Введіть назву компанії" defaultValue={this.props.title||''} />
						</div>
						<button type="submit" data-ajax-formsubmit className="search-construct-button" ></button>	
					</div>
					<div className="admin-helper">
						<span className="admin-row-not-published">- Не показується на порталі</span>
						<span className="admin-row-proposed">- Запропоновані зміни</span>
					</div>
					<AdminCompanySearchResults companies={this.props.companies} currentPage={this.props.currentPage} totalPages={this.props.totalPages} />
				</form>
			</Layout>
		);
	}
}

AdminCompaniesPage.defaultProps = {
	companies: [],
	currentPage: 1,
	totalPages: 0
}

export default AdminCompaniesPage;