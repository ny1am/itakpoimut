import React from 'react';

class PleaseSignupDialog extends React.Component {
	render() {
		return (
			<div id="dialog" className="dialog">
				<div id="dialog_content" className="dialog_content">
					<div className="forbidden-figure"></div>
					<h1 className="smallHeader">
						Ця дія доступна тільки зареєстрованим користувачам
					</h1>
					<div className="actions">
						<a href="/login" className="dialog__button" data-ajax-dialog="login">Ввійти</a>
						<a href="/signup" className="regularLink block" data-ajax-dialog="signup">Реєстрація</a>
					</div>
				</div>
			</div>
		);
	}
}

export default PleaseSignupDialog;