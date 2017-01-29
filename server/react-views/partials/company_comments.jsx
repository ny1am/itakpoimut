import React from 'react';
import Pagination from '../components/Pagination.jsx';
import avatar from '../helpers/avatar';
import Comment from '../components/Comment';

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
				<Comment comment={item} />
			</li>
		));
	}
	render() {
		return (
			<div id="company-comments" className="container">
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
					<Pagination currentPage={this.props.currentPage} totalPages={this.props.totalPages}>
						<a data-ajax="company_comments" data-ajax-zone="company-comments" href={"/company/"+this.props.company._id+"?currentPage={{page}}#company-comments"} />
					</Pagination>
				</section>
				{this.renderCommentsForm()}
			</div>
		);
	}
}

CompanyComments.defaultProps = {
	commentsCount: 0,
	comments: [],
	currentPage: 1,
	totalPages: 0
}

export default CompanyComments;