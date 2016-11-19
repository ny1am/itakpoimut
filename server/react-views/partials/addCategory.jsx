import React from 'react';

import Checkbox from '../components/Checkbox.jsx';
import categoryByName from '../helpers/categoryByName';

class AddCategoryDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userSelectedCategories: []
		};
		this.selectCategory = this.selectCategory.bind(this);
		this.deleteSelectedCategory = this.deleteSelectedCategory.bind(this);
	}
	deleteSelectedCategory(category) {
		let selectedCategories = this.state.userSelectedCategories;
		let index = selectedCategories.indexOf(category);
		if (index > -1) {
			selectedCategories.splice(index, 1);
		}
		this.setState({
			userSelectedCategories: selectedCategories
		});
	}
	selectCategory(event) {
		let selectedCategories = this.state.userSelectedCategories;
		if (event.target.checked) {
			selectedCategories.push(event.target.value);
		} else {
			let index = selectedCategories.indexOf(event.target.value);
			if (index > -1) {
				selectedCategories.splice(index, 1);
			}
		}
		this.setState({
			userSelectedCategories: selectedCategories
		});
	}
	renderCompanyCategories() {
		function renderList(list) {
			return list.map(item =>(
				<li>
					{categoryByName(item)}
				</li>
			));
		}
		if (this.props.companyCategories.length > 0) {
			return (
				<ul className="prev-categories">
					{renderList(this.props.companyCategories)}
				</ul>
			);
		} else {
			return null;
		}
	}
	renderCategories() {
		function renderList(list, selectedCategories, selectCategory) {
			return list.map(item =>(
				<li>
					<div className="check-row">
						<Checkbox id={"ctg_"+item} name="selectedCategories[]" value={item} checked={selectedCategories.indexOf(item) > -1} onChange={selectCategory} />
						<label htmlFor={"ctg_"+item}>
							{categoryByName(item)}
						</label>
					</div>
				</li>
			));
		}
		if (this.props.categoriesList.length > 0) {
			return (
				<div className="categories-holder">
					<span>Оберіть сфери зі списку:</span>
					<ul className="categories">
						{renderList(this.props.categoriesList, this.state.userSelectedCategories, this.selectCategory)}
					</ul>
				</div>
			)
		} else {
			return null;
		}
	}
	renderUserSelectedCategories() {
		function renderList(list, deleteSelectedCategory) {
			return list.map(item => (
				<li>
					<div className="selected-category-title">
						{categoryByName(item)}
					</div>
					<div className="delete-category" onClick={()=>{deleteSelectedCategory(item)}}></div>
				</li>
			));
		}
		if (this.state.userSelectedCategories.length > 0) {
			return (
				<ul className="selected-categories-mirror">
					{renderList(this.state.userSelectedCategories, this.deleteSelectedCategory)}
				</ul>
			);
		} else {
			return null;
		}
	}
	render() {
		return (
			<div id="dialog" className="dialog dialog--category dialog--left">
				<div id="dialog_content" className="dialog_content">
					<h1 className="dialog__h1">
						Додати сферу
					</h1>
					<p>
						Тут ви можете відзначити сфери, до яких належить компанія. Протягом кількох днів адміністратор перевірить інформацію і вона з'явиться на сайті.
					</p>
					<form action="/addCategory" method="post">
						<input type="hidden" name="company_id" value={this.props.company_id} />
						<div className="prev-categories-holder">
							<span>Уже відмічені сфери</span>
							<div className="prev-categories-block">
								{this.renderCompanyCategories()}
								{this.renderUserSelectedCategories()}
							</div>
						</div>
						{this.renderCategories()}
						<div className="right-content">
							<button className="dialog__button" type="submit" data-ajax-submit-dialog="addCategory">Готово</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

AddCategoryDialog.defaultProps = {
	companyCategories: [],
	categoriesList: []
}

export default AddCategoryDialog;