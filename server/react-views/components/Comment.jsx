import React, {Component} from 'react';
import formatDate from '../helpers/formatDate';
import avatar from '../helpers/avatar';

class Comment extends Component {
	render() {
		let comment = this.props.comment;
		let company = comment._company;
		let user = comment._user;
		return (
			<li data-href="/company/{company._id}">
				<article className="comment">
					<div className="comment-image">
						<img src={avatar(user.picture_url, 90)} />
					</div>
					<div className="comment-body">
						<div className="comment-meta">
							<span className="comment-author">
								{user.fname} {user.lname}
							</span>
							<span className="comment-time">
								{formatDate(comment.created)}
							</span>
							<a href="/company/{company._id}" className="comment-theme">
								до теми {company.title}
							</a>
						</div>
						<p className="comment-text">
							{comment.text}
						</p>
					</div>
				</article>
			</li>
		);
	}
}

export default Comment;