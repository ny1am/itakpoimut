import React from 'react';
import Pagination from '../components/Pagination.jsx';

function companyClassName(company) {
	let result = "admin-row";
	if (!company.published) {
		result += " admin-row-not-published";
	}
	if (company.proposals) {
		result += " admin-row-proposed";
	}
	return result;
}

class AdminCompanySearchResults extends React.Component {
	renderCompanies() {
		return this.props.companies.map(company => (
			<div className={companyClassName(company)}>
				<div>
					{company._id}
				</div>
				<div>
					{company.title}
				</div>
				<div>
					<a href={"/admin/company?_id="+company._id}>Редагувати</a>
				</div>
			</div>
		));
	}
	render() {
		return (
			<div id="search-results" className="search-results">
				{this.renderCompanies()}
				<Pagination currentPage={this.props.currentPage} totalPages={this.props.totalPages}>
					<button type="submit" formAction="/admin/companies?currentPage={{page}}" data-ajax-formsubmit />
				</Pagination>
			</div>
		);
	}
}

AdminCompanySearchResults.defaultProps = {
	companies: [],
	currentPage: 1,
	totalPages: 0
}

export default AdminCompanySearchResults;