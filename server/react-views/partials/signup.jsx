var React = require('react');
var Checkbox = require('../components/Checkbox.jsx');

class SignupDialog extends React.Component {
	render() {
		const fnameClass = this.props.errors.fname?'row--error':'';
		const lnameClass = this.props.errors.lname?'row--error':'';
		const emailClass = this.props.errors.email?'row--error':'';
		const passwordClass = this.props.errors.password?'row--error':'';
		return (
			<div id="dialog" className="dialog">
				<div id="dialog_content" className="dialog_content">
					<h1 className="dialog__h1">
						Реєстрація
					</h1>
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
					<form action="/signup" method="post">
						<div className={fnameClass+' row'}>
							<label className="row__label" htmlFor="fname">
								{this.props.errors.fname || 'Ім\'я'}
							</label>
							<input className="row__input higher" type="text" name="fname" defaultValue={this.props.fname||''} maxLength="25" />	
						</div>
						<div className={lnameClass+' row'}>
							<label className="row__label" htmlFor="lname">
								{this.props.errors.lname || 'Прізвище'}
							</label>
							<input className="row__input higher" type="text" name="lname" defaultValue={this.props.lname||''} maxLength="25" />	
						</div>
						<div className={emailClass+' row'}>
							<label className="row__label" htmlFor="email">
								{this.props.errors.email || 'E-mail'}
							</label>
							<input className="row__input higher" type="email" name="email" defaultValue={this.props.email||''} maxLength="50" />	
						</div>
						<div className={passwordClass+' row'}>
							<label className="row__label" htmlFor="password">
								{this.props.errors.password || 'Пароль'}
							</label>
							<div className="password-holder">
								<input id="loginPassword" className="row__input higher password" type="password" name="password" defaultValue={this.props.password||''} maxLength="25" />
								<div className="password-toggle" title="Показати пароль" data-title="Показати пароль" data-shown-title="Сховати пароль" data-password-toggle="loginPassword"></div>
							</div>
							<aside className="row--aside ">
								<Checkbox id="rememberme">
									<input type="checkbox" name="rememberme" value="true" defaultChecked={this.props.rememberme||false} />
								</Checkbox>
								<label htmlFor="rememberme" className="label--small">Пам'ятати мене</label>
							</aside>
						</div>
						<button className="dialog__button" type="submit" data-ajax-submit-dialog="signup">Зареєструватись</button>
					</form>
					<aside className="dialog__aside">
						<a href="/login" data-ajax-dialog="login">У мене вже є аккаунт</a>
					</aside>
				</div>
			</div>
		);
	}
}

SignupDialog.defaultProps = {
	errors: {}
}

module.exports=SignupDialog;