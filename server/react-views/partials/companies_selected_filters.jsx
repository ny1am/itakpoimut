import React from 'react';

class CompaniesSelectedFilters extends React.Component {

	constructor(props) {
		super(props)
		this.removeFilters = this.removeFilters.bind(this);
		this.removeFilter = this.removeFilter.bind(this);
	}

	removeFilters(e) {
		e.preventDefault();
		this.props.removeHandler();
	}

	removeFilter(e, id) {
		e.preventDefault();
		this.props.removeHandler(id);
	}

	renderRemove(item) {
		//todo: server doesn't return id. change this to check is rendered on server
		if (item.id) {
			return (
				<div className="rm-selected-filter" onClick={(evt) => this.removeFilter(evt, item.id)} />
			)
		} else {
			return null
		}
	}
	renderSelectedFiltersItems() {
		return this.props.selectedFilters.map(item => (
			<li className="selected-filter-el">
				{item.text}
				{this.renderRemove(item)}
			</li>
		))
	}
	render() {
		if (this.props.selectedFilters.length > 0) {
			return (
				<div className="selected-filters-holder">
					<ul className="selected-filters">
						{this.renderSelectedFiltersItems()}
						<li className="selected-filter-all">
							<a href="/companies" onClick={this.removeFilters}>
								Скинути всі
							</a>
						</li>
					</ul>
				</div>
			)
		} else {
			return null
		}
	}
}

CompaniesSelectedFilters.defaultProps = {
	selectedFilters: []
}

export default CompaniesSelectedFilters;