import React from 'react';

import Layout from '../layouts/Main';
import avatar from '../helpers/avatar';

class UserProfilePage extends React.Component {
	renderMessage() {
		if (this.props.successSave) {
			return (
				<div className="dialog-success">
					Зміни збережено
				</div>
			);
		} else {
			return null;
		}
	}
	renderError() {
		if (this.props.errors.page) {
			<div class="dialog-error">
				{this.props.errors.page}
			</div>
		} else {
			return null;
		}
	}
	renderChangePasswordLink() {
		if (this.props.loggedUser.provider === 'local') {
			return (
				<div className="row">
					<a href="/changePassword" className="form-link" data-ajax-dialog="changePassword">
						Змінити пароль
					</a>
				</div>
			);
		} else {
			return null;
		}
	}
	render() {
		const fnameClass = this.props.errors.fname?'row--error':'';
		const lnameClass = this.props.errors.lname?'row--error':'';
		const userpicClass = this.props.errors.userpic?'fu-error':'';
		return (
			<Layout page_url={this.props.page_url} loggedUser={this.props.loggedUser}>
				<div className="pattern-content">
					<div className="container">
						<div className="page-content">
							{this.renderMessage()}
							{this.renderError()}
							<form action="/userProfile" method="post" enctype="multipart/form-data">
								<section className="page-block">
									<h1 className="page__h1">
										Ваші особисті дані
									</h1>
									<div className="row">
										<label className="row__label">
											E-mail
										</label>
										<div className="row-text">
											{this.props.loggedUser.email}
										</div>
									</div>
									<div className={fnameClass+' row'}>
										<label className="row__label" htmlFor="fname">
											{this.props.errors.fname || 'Ім\'я'}
										</label>
										<input className="row__input" type="text" name="fname" defaultValue={this.props.fname||''} maxLength="25" />	
									</div>
									<div className={lnameClass+' row'}>
										<label className="row__label" htmlFor="lname">
											{this.props.errors.lname || 'Прізвище'}
										</label>
										<input className="row__input" type="text" name="lname" defaultValue={this.props.lname||''} maxLength="25" />	
									</div>
									{this.renderChangePasswordLink()}
								</section>
								<section className="page-block">
									<h1 className="page__h1">
										Ваше фото
									</h1>
									<div className={userpicClass+' userpic'}>
										<img src={avatar(this.props.loggedUser.picture_url)} />
										<input type="file" name="userpic"/>
									</div>
									<div className="hint">
										JPEG або PNG,<br/> розміром до 1 Mb
									</div>
								</section>
								<div className="row">
									<button className="page__button" type="submit">
										Зберегти зміни
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

UserProfilePage.defaultProps = {
	errors: {}
}

export default UserProfilePage;