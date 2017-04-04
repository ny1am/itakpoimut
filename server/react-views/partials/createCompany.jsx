import React from 'react';

class CreateCompanyDialog extends React.Component {
	renderDialogError() {
		if (this.props.errors.dialog) {
			return (
				<div className="dialog-error">
					{this.props.errors.dialog}
				</div>
			);
		} else {
			return null;
		}
	}
	renderCategoriesOptions() {
		return this.props.categoriesList.map(item => (
			<option value={item.name} selected={this.props.selectedCategories.indexOf(item.name)>-1}>
				{item.text}
			</option>
		));
	}
	renderViolationsOptions() {
		return this.props.violationsList.map(item => (
			<option value={item.name} selected={this.props.selectedViolations.indexOf(item.name)>-1}>
				{item.text}
			</option>
		));
	}
	render() {
		const attachmentClass = this.props.errors.attachment?'fu-error':'';
		const titleClass = this.props.errors.title?'row--error':'';
		const descriptionClass = this.props.errors.description?'row--error':'';
		const company_siteClass = this.props.errors.company_site?'row--error':'';
		return (
			<div id="dialog" className="dialog dialog--company dialog--left">
				<div id="dialog_content" className="dialog_content">
					<h1 className="dialog__h1">
						Запропонувати компанію
					</h1>
					{this.renderDialogError()}
					<p>
						Зазначимо, що ви тільки пропонуєте компанію на розгляд. Після того її затверджує модератор, і система сама присвоює компанії статус лояльної/порушника на основі наявності/відсутності порушень.
					</p>
					<form action="/createCompany" method="post" encType="multipart/form-data">
						<div className="row--logo">
							<div className="company-attachment-h">
								<label className="row__label">
									Лого компанії
								</label>
								<div className={"company-attachment "+attachmentClass}>
									<input type="file" name="attachment" title="Завантажте лого"/>
								</div>
								<div className="hint">
									JPEG або PNG,<br/> розміром до 1 Mb
								</div>
							</div>
							<div>
								<div className={"row "+titleClass}>
									<label className="row__label" htmlFor="title">
										{this.props.errors.title || 'Назва компанії'}
									</label>
									<input className="row__input" type="text" name="title" defaultValue={this.props.title||''} maxLength="300" />
								</div>
								<div className="row">
									<label className="row__label" htmlFor="selectedCategories[]">
										Оберіть сфери компанії
									</label>
									<select name="selectedCategories[]" className="row__input" multiple>
										{this.renderCategoriesOptions()}
									</select>
									{/*todo: add noscript hint*/}
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
								<div className="row">
									<label className="row__label" htmlFor="selectedViolations[]">
										Оберіть порушення компанії
									</label>
									<select name="selectedViolations[]" className="row__input" multiple>
										{this.renderViolationsOptions()}
									</select>
									{/*todo: add noscript hint*/}
								</div>
							</div>
						</div>
						<div className="right-content">
							<button className="dialog__button" type="submit" data-ajax-submit-dialog="createCompany">Додати</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

CreateCompanyDialog.defaultProps = {
	errors: {},
	selectedCategories: [],
	selectedViolations: []
}

export default CreateCompanyDialog;