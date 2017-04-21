import React from 'react';

import $ from 'jquery';

import Checkbox from '../components/Checkbox.jsx';
import Radio from '../components/Radio.jsx';
import CompaniesSearchResults from '../partials/companies_searchResults.jsx';
import CompaniesSelectedFilters from '../partials/companies_selected_filters.jsx';

import loyalties from '../../../shared/js/loyalties.js';
import categories from '../../../shared/js/categories.js';
import violations from '../../../shared/js/violations.js';

class CompaniesPage extends React.Component {

	constructor(props) {
		super(props);
		this.refresh = this.refresh.bind(this);
		this.handleLoyaltyChange = this.handleLoyaltyChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleViolationChange = this.handleViolationChange.bind(this);
		this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
		this.state = {
			selectedLoyalty: props.selectedLoyalty||null,
			selectedCategory: props.selectedCategory||null,
			selectedViolations: props.selectedViolations,

			companies: props.companies,
			companiesCount: props.companiesCount,
			allCompaniesCount: props.allCompaniesCount,
			currentPage: props.currentPage,
			totalPages: props.totalPages,
			sortOrder: props.sortOrder,
			
			selectedFilters: props.selectedFilters
		}
	}
	render() {
		return (
			<div className="pattern-content">
				<div className="container">
					<form action="/companies" method="POST" ref="form" onSubmit={this.refresh}>
						<div className="search-bar">
							<div className="search-construct search-construct--highlight">
								<div className="search-construct-input">
									<input type="text" name="title" placeholder="Введіть назву компанії" defaultValue={this.props.title} />
								</div>
								<button type="submit" className="search-construct-button"></button>	
							</div>
							<CompaniesSelectedFilters selectedFilters={this.state.selectedFilters} removeHandler={this.handleRemoveFilter} />
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
								companies={this.state.companies} 
								companiesCount={this.state.companiesCount}
								allCompaniesCount={this.state.allCompaniesCount}
								currentPage={this.state.currentPage} 
								totalPages={this.state.totalPages} 
								sortOrder={this.state.sortOrder} 
							/>
						</div>
					</form>
				</div>
			</div>
		);
	}

	refresh(evt) {
		if (evt) {
			evt.preventDefault();
		}
		let that = this;
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: '/companies?currentPage='+this.state.currentPage+'&sortOrder='+this.state.sortOrder,
			data: $(this.refs.form).serializeObject(),
			success: function(data, textStatus, jqXHR) {
				let {companies, companiesCount, allCompaniesCount, currentPage, totalPages, sortOrder} = data;
				that.setState({companies, companiesCount, allCompaniesCount, currentPage, totalPages, sortOrder});
			},
			error: function() {
				window.location.href = "/404";
			},
			contentType: 'application/json'
		});
	}

	handleRemoveFilter(id) {
		if (id) {
			let filter = this.state.selectedFilters.find(el => el.id === id);
			if (filter) {
				if (filter.type === 'loyalty') {
					this.setState({selectedLoyalty: null}, this._calculateSelectedFilters);
				}
				if (filter.type === 'category') {
					this.setState({selectedCategory: null}, this._calculateSelectedFilters);
				}
				if (filter.type === 'violation') {
					let selectedViolations = this.state.selectedViolations;
					let index = selectedViolations.indexOf(id);
					if (index > -1) {
						selectedViolations.splice(index, 1);
					}
					this.setState({selectedViolations}, this._calculateSelectedFilters);
				}
			}
		} else {
			this.setState({
				selectedLoyalty: null,
				selectedCategory: null,
				selectedViolations: [],
				selectedFilters: []
			}, this._calculateSelectedFilters);
		}
	}

	handleLoyaltyChange(el) {
		let selectedLoyalty = el.target.checked?el.target.value:null;
		this.setState({selectedLoyalty}, this._calculateSelectedFilters);
	}

	handleCategoryChange(el) {
		let selectedCategory = el.target.checked?el.target.value:null;
		this.setState({selectedCategory}, this._calculateSelectedFilters);
	}

	handleViolationChange(el) {
		let selectedViolations = this.state.selectedViolations;
		if (el.target.checked) {
			selectedViolations.push(el.target.value);
		} else {
			let index = selectedViolations.indexOf(el.target.value);
			if (index > -1) {
				selectedViolations.splice(index, 1);
			}
		}
		this.setState({selectedViolations}, this._calculateSelectedFilters);
	}

	_calculateSelectedFilters() {
		let result = [];
		if (this.state.selectedLoyalty) {
			result.push({
				id: this.state.selectedLoyalty,
				type: 'loyalty',
				text: loyalties.getByName(this.state.selectedLoyalty).text
			})
		}
		if (this.state.selectedCategory) {
			result.push({
				id: this.state.selectedCategory,
				type: 'category',
				text: categories.getByName(this.state.selectedCategory).text
			})
		}
		result.push(...this.state.selectedViolations.map(violation => {
			return {
				id: violation,
				type: 'violation',
				text: violations.getByName(violation).text
			}
		}));
		this.setState({selectedFilters: result}, this.refresh)
	}

	renderLoyaltiesList() {
		return this.props.loyaltiesList.map(loyalty => (
			<li className="row">
				<div className="check-row">
					<Radio id={"rnk_"+loyalty.name} name="selectedLoyalty" value={loyalty.name} defaultChecked={loyalty.name===this.state.selectedLoyalty} onChange={this.handleLoyaltyChange} />
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
					<Radio id={"ctg_"+category.name} name="selectedCategory" value={category.name} defaultChecked={category.name===this.state.selectedCategory} onChange={this.handleCategoryChange} />
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
					<Checkbox id={"vlt_"+violation.name} name="selectedViolations[]" value={violation.name} defaultChecked={this.state.selectedViolations.indexOf(violation.name)>-1} onChange={this.handleViolationChange}/>
					<label htmlFor={"vlt_"+violation.name}>
						{violation.text}
					</label>
				</div>
			</li>
		))
	}
}

CompaniesPage.defaultProps = {
	loyaltiesList: [],
	categoriesList: [],
	violationsList: [],
	companies: [],
	companiesCount: 0,
	allCompaniesCount: 0,
	currentPage: 1,
	totalPages: 0,
	sortOrder: 'asc',
	selectedViolations: [],
	selectedFilters: []
}

export default CompaniesPage;