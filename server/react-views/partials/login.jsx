var React = require('react');
var Checkbox = require('../components/Checkbox.jsx');

class LoginDialog extends React.Component {
	renderMessage() {
		if (this.props.message && this.props.message.length !== 0) {
			return (
				<div className="notification-message">
					{this.props.message}
				</div>
			);
		} else {
			return null;
		}
	}
	render() {
		const usernameClass = this.props.errors.username?'row--error':'';
		const passwordClass = this.props.errors.password?'row--error':'';
		return (
			<div id="dialog" className="dialog">
				<div id="dialog_content" className="dialog_content">
					<h1 className="dialog__h1">
						Вхід
					</h1>
					{this.renderMessage()}
					<div className="dialog-socials">
						<a href="/auth/facebook" className="login-fb">
							Вхід через Facebook
						</a>
						<a href="/auth/google" className="login-google">
							Вхід через Google+
						</a>
					</div>
					<div className="login-separator">
						або
					</div>
					<form action="/login" method="post">
						<div className={usernameClass+' row'}>
							<label className="row__label" htmlFor="username">
								{this.props.errors.username || 'E-mail'}
							</label>
							<input className="row__input higher" type="email" name="username" defaultValue={this.props.username||''} maxLength="50" />
						</div>
						<div className={passwordClass+' row'}>
							<label className="row__label" htmlFor="password">
								{this.props.errors.password || 'Пароль'}
							</label>
							<div className="password-holder">
								<input id="loginPassword" className="row__input higher password" type="password" name="password" defaultValue={this.props.password||''} maxLength="25" />
								<div className="password-toggle" title="Показати пароль" data-title="Показати пароль" data-shown-title="Сховати пароль" data-password-toggle="loginPassword"></div>
							</div>
							<aside className="row--aside">
								<Checkbox id="rememberme">
									<input type="checkbox" name="rememberme" value="true" defaultChecked={this.props.rememberme||false} />
								</Checkbox>
		            <label htmlFor="rememberme" className="label--small">
		            	Пам'ятати мене
		            </label>
								<a href="/forgot" className="right-link" data-ajax-dialog="forgot">
									Забули пароль?
								</a>
							</aside>
						</div>
						<button className="dialog__button" type="submit" data-ajax-submit-dialog="login">Ввійти</button>
					</form>
					<aside className="dialog__aside">
						<a href="/signup" data-ajax-dialog="signup">Реєстрація</a>
					</aside>
				</div>
			</div>
		);
	}
}

LoginDialog.defaultProps = {
	errors: {}
}

module.exports=LoginDialog;