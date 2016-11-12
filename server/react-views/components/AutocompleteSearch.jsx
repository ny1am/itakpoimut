import React, {Component} from 'react';

class AutocompleteSearch extends Component {
	renderCategoriesOptions() {
		return this.props.categories.map(item => (
			<option value={item.name}>
				{item.text}
			</option>
		));
	}
	render() {
		return (
			<article className="main-search">
				<form action="/companies" method="GET">
					<div className="search-construct">
						<div className="search-construct-input">
							<input name="title" type="text" placeholder="Введіть назву компанії" data-ajax-autocomplete="langing-auto" autocomplete="off" />
							<div id="autocomplete-popup"></div>
						</div>
						<div className="search-construct-select">
							<select id="selectedCategory" name="selectedCategory" data-trigger-ajax-autocomplete="langing-auto">
								<option value="">Всі сфери</option>
								{this.renderCategoriesOptions()}
							</select>
						</div>
						<button type="submit" className="search-construct-button"></button>
					</div>
				</form>
			</article>
		);
	}
}

export default AutocompleteSearch;