import React from 'react';

class ChangePasswordDialog extends React.Component {
	render() {
		const passwordClass = this.props.errors.password?'row--error':'';
		const newPasswordClass = this.props.errors.newPassword?'row--error':'';
		return (
			<div id="dialog" className="dialog">
				<div id="dialog_content" className="dialog_content">
					<h1 className="dialog__h1">
						Змінити пароль
					</h1>
					<form action="/changePassword" method="post">
						<div className={passwordClass+' row'}>
							<label className="row__label" htmlFor="password">
								{this.props.errors.password || 'Існуючий пароль'}
							</label>
							<div className="password-holder">
								<input id="password" className="row__input password" type="password" name="password" defaultValue={this.props.password||''} maxLength="25" />
								<div className="password-toggle" title="Показати пароль" data-title="Показати пароль" data-shown-title="Сховати пароль" data-password-toggle="password"></div>
							</div>
						</div>
						<div className={newPasswordClass+' row'}>
							<label className="row__label" htmlFor="newPassword">
								{this.props.errors.newPassword || 'Новий пароль'}
							</label>
							<div className="password-holder">
								<input id="newPassword" className="row__input higher password" type="password" name="newPassword" defaultValue={this.props.newPassword||''} maxLength="25" />
								<div className="password-toggle" title="Показати пароль" data-title="Показати пароль" data-shown-title="Сховати пароль" data-password-toggle="newPassword"></div>
							</div>
						</div>
						<button className="dialog__button" type="submit" data-ajax-submit-dialog="changePassword">Змінити</button>
					</form>
				</div>
			</div>
		);
	}
}

ChangePasswordDialog.defaultProps = {
	errors: {}
}

export default ChangePasswordDialog;