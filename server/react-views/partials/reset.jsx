import React from 'react';
import Password from '../components/Password.jsx';

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
							<Password id="loginPassword" className="row__input higher password" type="password" name="password" defaultValue={this.props.password||''} maxLength="25" />
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