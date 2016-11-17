import React from 'react';

class ResetPasswordDialog extends React.Component {
	render() {
		const passwordClass = this.props.errors.password?'row--error':'';
		return (
			<div id="dialog" className="dialog">
				<div id="dialog_content" className="dialog_content">
					<h1 className="dialog__h1">
						Змінити пароль
					</h1>
					<form action="/reset" method="post">
						<input type="hidden" name="token" value={this.props.token} />
						<div className={passwordClass+' row'}>
							<label className="row__label" htmlFor="password">
								{this.props.errors.password || 'Новий пароль'}
							</label>
							<div className="password-holder">
								<input id="loginPassword" className="row__input higher password" type="password" name="password" defaultValue={this.props.password||''} maxLength="25" />
								<div className="password-toggle" title="Показати пароль" data-title="Показати пароль" data-shown-title="Сховати пароль" data-password-toggle="loginPassword"></div>
							</div>
						</div>
						<button className="dialog__button" type="submit" data-ajax-submit-dialog="reset">Змінити</button>
				</form>
				</div>
			</div>
		);
	}
}

ResetPasswordDialog.defaultProps = {
	errors: {}
}

export default ResetPasswordDialog;