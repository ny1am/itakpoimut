import React from 'react';

class CompaniesSelectedFilters extends React.Component {
	renderRemove(item) {
		if (item.id) {
			return (
				<div className="rm-selected-filter" data-company-clear-filter={item.id} />
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
	renderSelectedFilters() {
		if (this.props.selectedFilters.length > 0) {
			return (
				<div className="selected-filters-holder">
					<ul className="selected-filters">
						{this.renderSelectedFiltersItems()}
						<li className="selected-filter-all">
							<a href="/companies" data-company-clear-filters>
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
	render() {
		return (
			<div id="selectedFiltersContainer">
				{this.renderSelectedFilters()}
			</div>
		)
	}
}

CompaniesSelectedFilters.defaultProps = {
	selectedFilters: []
}

export default CompaniesSelectedFilters;