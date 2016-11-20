import React from 'react';

import Layout from '../layouts/Admin';
import Checkbox from '../components/Checkbox.jsx';
import companyPicture from '../helpers/companyPicture.js';

class AdminCompanyPage extends React.Component {
	renderCompanyLinks() {
		const style={marginBottom: 50, display: 'block'};
		if (this.props._id) {
			return [
				<a href={"/company/"+this.props._id} target="_blank" style={style}>
					Відкрити на порталі
				</a>,
				<a href={"/admin/deleteCompany?_id="+this.props._id} style={style}>
					Видалити
				</a>
			]
		} else {
			return null;
		}
	}
	renderDialogError() {
		if (this.props.errors.dialog) {
			return (
				<div className="dialog-error">
					{this.props.errors.dialog}
				</div>
			)
		} else {
			return null;
		}
	}
	renderIdHidden() {
		if (this.props._id) {
			return (
				<input type="hidden" name="_id" value={this.props._id} />
			)
		} else {
			return null;
		}
	}
	renderProposalsHidden() {
		if (this.props.proposals) {
			return (
				<input type="hidden" name="proposals" value="true" />
			)
		} else {
			return null;
		}
	}
	renderCategories() {
		return this.props.categoriesList.map(category => (
			<li className="row">
				<div className="check-row">
					<Checkbox id={'ctg_'+category.name} name="selectedCategories[]" value={category.name} defaultChecked={this.props.selectedCategories.indexOf(category.name)>-1} />
						<label htmlFor="ctg_{{name}}">
							{category.text}
							{this.renderCategoryProposedText(category)}
						</label>
				</div>
			</li>
		));
	}
	renderCategoryProposedText(category) {
		if (this.props.proposedCategories.indexOf(category.name)>-1) {
			return (
				<span className="admin-row-proposed"> - пропозиція від користувача</span>
			)
		} else {
			return null;
		}
	}
	renderViolations() {
		return this.props.violationsList.map(violation => (
			<li className="row">
				<div className="check-row">
					<Checkbox id={'vlt_'+violation.name} name="selectedViolations[]" value={violation.name} defaultChecked={this.props.selectedViolations.indexOf(violation.name)>-1} />
					<label htmlFor="vlt_{{name}}">
						{violation.text}
						{this.renderViolationProposedText(violation)}
					</label>
				</div>
			</li>
		));
	}
	renderViolationProposedText(violations) {
		if (this.props.proposedViolations.indexOf(violations.name)>-1) {
			return (
				<span className="admin-row-proposed"> - пропозиція від користувача</span>
			)
		} else {
			return null;
		}
	}
	renderLoyaltyOptions() {
		return this.props.loyaltiesList.map(loyalty => (
			<option value={loyalty.name}>
				{loyalty.text}
			</option>
		))
	}
	renderProposalsCheck() {
		if (this.props.proposals) {
			return (
				<div className="row">
					<div className="check-row">
						<Checkbox id="proposalsSeen" name="proposalsSeen" value="true" defaultChecked={this.props.proposalsSeen} />
						<label htmlFor="proposalsSeen">
								Запропоновані зміни переглянуто
						</label>
					</div>
				</div>
			)
		} else {
			return null;
		}
	}
	render() {
		const titleClass = this.props.errors.title?'row--error':'';
		const attachmentClass = this.props.errors.attachment?'fu-error':'';
		const descriptionClass = this.props.errors.description?'row--error':'';
		const company_siteClass = this.props.errors.company_site?'row--error':'';
		const loyaltyClass = this.props.errors.loyalty?'row--error':'';
		return (
			<Layout page_url={this.props.page_url} loggedUser={this.props.loggedUser}>
				<div className="dialog dialog--company">
					<div className="dialog_content">
						<h1 className="dialog__h1">
							Компанія
						</h1>
						{this.renderCompanyLinks()}
						{this.renderDialogError()}
						<form action="/admin/company" method="post" encType="multipart/form-data">
							{this.renderIdHidden()}
							{this.renderProposalsHidden()}
							<div className="row">
								<div className="check-row">
									<Checkbox id="published" name="published" value="true" defaultChecked={this.props.published} />
									<label htmlFor="published">
										Відображати на порталі
									</label>
								</div>
							</div>
							<div className={"row "+titleClass}>
								<label className="row__label" htmlFor="title">
									{this.props.errors.title || 'Назва компанії'}
								</label>
								<input className="row__input" type="text" name="title" defaultValue={this.props.title||''} maxLength="300" />
							</div>
							<div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>   
								<div className={"userpic "+attachmentClass} style={{alignSelf: 'center'}}>
									<img src={companyPicture(this.props.img)} width="100" style={{left: 20}} />
									<input type="file" name="attachment"/>
								</div>
								<div className="hint">
										JPEG або PNG,<br/> розміром до 1 Mb
								</div>
							</div>
							<div className={"row "+descriptionClass}>
								<label className="row__label" htmlFor="description">
									{this.props.errors.description || 'Опис компанії'}
								</label>
								<textarea className="row__input" name="description" maxLength="300" defaultValue={this.props.description||''}></textarea>
							</div>
							<div className={"row "+company_siteClass}>
								<label className="row__label" htmlFor="company_site">
									{this.props.errors.company_site || 'Посилання на сайт (якщо є)'}
								</label>
								<div className="http">
									<input className="http" type="text" name="company_site" maxLength="100" defaultValue={this.props.company_site||''} />
								</div>
							</div>
							<hr/>
							<p>
								Сфери
							</p>
							<ul className="violations">
								{this.renderCategories()}
							</ul>
							<hr/>
							<p>
								Порушення
							</p>
							<ul className="violations">
								{this.renderViolations()}
							</ul>
							<div className={"row "+loyaltyClass}>
								<label className="row__label" htmlFor="loyalty">
									{this.props.errors.loyalty || 'Лояльність'}
								</label>
								<select className="row_input" name="loyalty" defaultValue={this.props.loyalty}>
									{this.renderLoyaltyOptions()}
								</select>
							</div>
							{this.renderProposalsCheck()}
							<div className="right-content">
									<button className="dialog__button" type="submit">Зберегти</button>
							</div>
						</form>
					</div>
				</div>
			</Layout>
		);
	}
}

AdminCompanyPage.defaultProps = {
	errors: {},
	selectedCategories: [],
	proposedCategories: [],
	selectedViolations: [],
	proposedViolations: [],
	proposalsSeen: false
}

export default AdminCompanyPage;