import React from 'react';
import avatar from '../helpers/avatar';
import formatDate from '../helpers/formatDate';

class CompanyComments extends React.Component {
	renderCommentsForm() {
		if (this.props.loggedUser) {
			return (
				<form action="/addComment" className="add-comment" method="post" data-ajax-zone="company-comments" data-ajax-tmpl="company_comments" data-ajax-anchor="company-comments">
					<input type="hidden" name="_company" value={this.props.company._id}></input>
					<h2>
						Додати коментар
					</h2>
					<div className="comment-row">
						<div className="add-comment-image">
							<img src={avatar(this.props.loggedUser.picture_url)} />
						</div>
						<textarea placeholder="Введіть ваш коментар" name="text" maxLength="500"></textarea>
					</div>
					<div className="right-content">
						<button className="dialog__button" type="submit" data-ajax-formsubmit>Додати коментар</button>
					</div>
				</form>
			)
		} else {
			return (
				<div className="guest-add-comment">
					Для того, щоб залишити коментар, вам необхідно <a href="/login" data-ajax-dialog="login">ввійти</a>
				</div>
			)
		}
	}
	renderComments() {
		if (this.props.comments.length > 0) {
			return (
				<ul className="company-comments__ul">
					{this.renderCommentItems()}
				</ul>
			)
		} else {
			return null;
		}
	}
	renderCommentItems() {
		return this.props.comments.map(item => (
			<li>
				<article className="comment">
					<div className="comment-image">
						<img src={avatar(item._user.picture_url, 90)} />
					</div>
					<div className="comment-body">
						<div className="comment-meta">
							<span className="comment-author">
								{item._user.fname} {item._user.lname}
							</span>
							<span className="comment-time">
								{formatDate(item.created)}
							</span>
						</div>
						<p className="comment-text">
							{item.text}
						</p>
					</div>
				</article>
			</li>
		));
	}
	render() {
		return (
			<div id="company-comments" class="container">
				<section className="company-comments">
					<header className="company-comments__header">
						<h1>
							Коментарі
						</h1>
						<span>
							{this.props.commentsCount} коментарів
						</span>
					</header>
					{this.renderComments()}
					{/*pagination here*/}
					{this.renderCommentsForm()}
				</section>
			</div>
		);
	}
}

CompanyComments.defaultProps = {
	commentsCount: 0,
	comments: []
}

export default CompanyComments;