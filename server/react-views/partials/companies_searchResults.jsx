import React from 'react';
import Pagination from '../components/Pagination.jsx';
import loyaltySingleByName from '../helpers/loyaltySingleByName.js';

class CompaniesSearchResults extends React.Component {
	renderCompanies() {
		return this.props.companies.map(company => (
			<div className="result-row">
				<a href={"/company/"+company._id} className="result-row-logo">
					<img src={company.img} />
				</a>
				<div className="result-row-body">
					<a href={"/company/"+company._id}>
						{company.title}
					</a>
					<p className="result-row-desc">
						{company.description}
					</p>
				</div>
				<div className="result-row-loyalty">
					<div className={"loyalty-mark "+company.loyalty}>
						{loyaltySingleByName(company.loyalty)}
					</div>
				</div>
			</div>
		));
	}
	render() {
		const newSortOrder = (this.props.sortOrder==='asc'?'desc':'asc');
		if (this.props.companies.length > 0) {
			return (
				<div id="search-results" className="search-results">
					<div className="search-results-header clearfix">
						Підібрано {this.props.companiesCount} з {this.props.allCompaniesCount} компаній
						<div className="right">
							<button type="submit" className={"plain sort-"+newSortOrder} formAction={"/companies?sortOrder="+newSortOrder} data-ajax-formsubmit>
								За алфавітом
							</button>
						</div>
					</div>
					<div className="search-results-items">
						{this.renderCompanies()}
					</div>
					<Pagination currentPage={this.props.currentPage} totalPages={this.props.totalPages}>
						<button type="submit" formAction={"/companies?currentPage={{page}}&sortOrder="+this.props.sortOrder} data-ajax-formsubmit />
					</Pagination>
				</div>
			)
		} else {
			return (
				<div id="search-results" className="search-results">
					За заданими вами параметрами нічого не знайдено.
				</div>
			)
		}
	}
}

CompaniesSearchResults.defaultProps = {
	companies: [],
	companiesCount: 0,
	allCompaniesCount: 0,
	currentPage: 1,
	totalPages: 0,
	sortOrder: 'asc'
}

export default CompaniesSearchResults;