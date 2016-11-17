import React from 'react';

class ForgotPasswordDialog extends React.Component {
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
	render() {
		const emailClass = this.props.errors.email?'row--error':'';
		return (
			<div id="dialog" className="dialog">
				<div id="dialog_content" className="dialog_content">
					<h1 className="dialog__h1">
						Відновлення паролю
					</h1>
					{this.renderDialogError()}
					<p>
						Вкажіть, будь ласка, e-mail, і ми скинемо вам посилання на відновлення паролю
					</p>
					<form action="/forgot" method="post">
						<div className={emailClass+' row'}>
							<label className="row__label" htmlFor="email">
									{this.props.errors.email || 'E-mail'}
							</label>
							<input className="row__input higher" type="email" name="email" defaultValue={this.props.email||''} maxLength="50" />
						</div>
						<button className="dialog__button" type="submit" data-ajax-submit-dialog="forgot">Надіслати</button>
					</form>
					<aside className="dialog__aside">
						<a href="/login" data-ajax-dialog="login">Я згадав/ла пароль</a>
					</aside>
				</div>
			</div>
		);
	}
}

ForgotPasswordDialog.defaultProps = {
	errors: {}
}

export default ForgotPasswordDialog;