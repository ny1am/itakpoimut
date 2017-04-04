import React from 'react';

import Layout from '../layouts/Main.jsx';
import Checkbox from '../components/Checkbox.jsx';
import Radio from '../components/Radio.jsx';
import CompaniesSearchResults from '../partials/companies_searchResults.jsx';
import CompaniesSelectedFilters from '../partials/companies_selected_filters.jsx';

class CompaniesPage extends React.Component {
	renderLoyaltiesList() {
		return this.props.loyaltiesList.map(loyalty => (
			<li className="row">
				<div className="check-row">
					<Radio id={"rnk_"+loyalty.name} name="selectedLoyalty" value={loyalty.name} defaultChecked={loyalty.name===this.props.selectedLoyalty} data-ajax-formsubmit data-ajax-callback-event="companiesRefreshed" data-company-filter />
					<label htmlFor={"rnk_"+loyalty.name} className={"loyalty-color "+loyalty.name}>
						{loyalty.text}
					</label>
				</div>
			</li>
		))
	}
	renderCategoriesList() {
		return this.props.categoriesList.map(category => (
			<li className="row">
				<div className="check-row">
					<Radio id={"ctg_"+category.name} name="selectedCategory" value={category.name} defaultChecked={category.name===this.props.selectedCategory} data-ajax-formsubmit data-ajax-callback-event="companiesRefreshed" data-company-filter />
					<label htmlFor={"ctg_"+category.name}>
						{category.text}
					</label>
				</div>
			</li>
		))
	}
	renderViolationsList() {
		return this.props.violationsList.map(violation => (
			<li className="row">
				<div className="check-row">
					<Checkbox id={"vlt_"+violation.name} name="selectedViolations[]" value={violation.name} defaultChecked={this.props.selectedViolations.indexOf(violation.name)>-1} data-ajax-formsubmit data-ajax-callback-event="companiesRefreshed" data-company-filter/>
					<label htmlFor={"vlt_"+violation.name}>
						{violation.text}
					</label>
				</div>
			</li>
		))
	}
	render() {
		return (
			<Layout page_url={this.props.page_url} loggedUser={this.props.loggedUser}>
				<div className="pattern-content">
					<div className="container">
						<form action="/companies" method="POST" data-ajax-zone="search-results" data-ajax-tmpl="companies_searchResults">
							<div className="search-bar">
								<div className="search-construct search-construct--highlight">
									<div className="search-construct-input">
										<input type="text" name="title" placeholder="Введіть назву компанії" defaultValue={this.props.title} />
									</div>
									<button type="submit" className="search-construct-button" data-ajax-formsubmit></button>	
								</div>
								<CompaniesSelectedFilters selectedFilters={this.props.selectedFilters} />
							</div>
							<div className="search-body">
								<details className="search-params" open>
									<summary className="search-params-header">
										Фільтри
									</summary>
									<div className="search-params-body">
										<h3 className="search-subtitle">
											За лояльністю
										</h3>
										<ul className="search-chk-group">
											{this.renderLoyaltiesList()}
										</ul>

										<h3 className="search-subtitle">
											Сфера
										</h3>
										<ul id="categoriesList" className="search-chk-group">
											{this.renderCategoriesList()}
										</ul>
										<div data-show-more="categoriesList" data-show-more-value={5} data-close></div>

										<h3 className="search-subtitle">
											Порушення
										</h3>
										<ul className="search-chk-group">
											{this.renderViolationsList()}
										</ul>
										<noscript>
											<button type="submit" className="dialog__button">Пошук</button>
										</noscript>
									</div>
								</details>
								<CompaniesSearchResults 
									companies={this.props.companies} 
									companiesCount={this.props.companiesCount}
									allCompaniesCount={this.props.allCompaniesCount}
									currentPage={this.props.currentPage} 
									totalPages={this.props.totalPages} 
									sortOrder={this.props.sortOrder} 
								/>
							</div>
						</form>
					</div>
				</div>
			</Layout>
		);
	}
}

CompaniesPage.defaultProps = {
	companies: [],
	companiesCount: 0,
	allCompaniesCount: 0,
	currentPage: 1,
	totalPages: 0,
	sortOrder: 'asc',
	selectedViolations: []
}

export default CompaniesPage;