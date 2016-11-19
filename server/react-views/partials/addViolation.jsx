import React from 'react';

import Checkbox from '../components/Checkbox.jsx';
import violationByName from '../helpers/violationByName';

class AddViolationDialog extends React.Component {
	renderViolations() {
		return this.props.violationsList.map(item => (
			<li className="row">
				<div className="check-row">
					<Checkbox id={"vlt_"+item} name="selectedViolations[]" value={item} defaultChecked={this.props.selectedViolations.indexOf(item) > -1} />
					<label htmlFor={"vlt_"+item}>
						{violationByName(item)}
					</label>
				</div>
			</li>
		));
	}
	render() {
		return (
			<div id="dialog" className="dialog dialog--company dialog--left">
				<div id="dialog_content" className="dialog_content">
					<h1 className="dialog__h1">
						Додати порушення
					</h1>
					<form action="/addViolation" method="post">
						<input type="hidden" name="company_id" value={this.props.company_id} />
						<p>
							Тут ви можете відмітити порушення компанії
						</p>
						<ul className="violations">
							{this.renderViolations()}
						</ul>
						<div className="right-content">
							<button className="dialog__button" type="submit" data-ajax-submit-dialog="addViolation">Додати</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

AddViolationDialog.defaultProps = {
	selectedViolations: []
}

export default AddViolationDialog;