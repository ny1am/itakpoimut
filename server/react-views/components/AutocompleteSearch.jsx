import React from 'react';

class AutocompleteSearch extends React.Component {
	constructor(props) {
		super(props);
		this.changeTitle = this.changeTitle.bind(this);
		this.changeCategory = this.changeCategory.bind(this);
		this.state = {
			title: '',
			category: ''
		};
	}
	changeTitle(e) {
		this.setState({
			title: e.target.value
		});
	}
	changeCategory(e) {
		this.setState({
			category: e.target.value
		});
	}
	renderCategoriesOptions() {
		if (!this.props.categories) return null;
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
							<input name="title" type="text" placeholder="Введіть назву компанії" autoComplete="off" value={this.state.title} onChange={this.changeTitle} />
						</div>
						<div className="search-construct-select">
							<select name="selectedCategory" value={this.state.category} onChange={this.changeCategory}>
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