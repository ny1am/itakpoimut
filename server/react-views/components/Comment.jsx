import React, {Component} from 'react';

class Comment extends Component {
	render() {
		let comment = this.props.comment;
		let company = comment._company;
		let user = comment._user;
		return (
			<li data-href="/company/{company._id}">
				<article className="comment">
					<div className="comment-image">
						{/*<img src={{picture-90 _user.picture_url}}>*/}
						<img src={user.picture_url} />
					</div>
					<div className="comment-body">
						<div className="comment-meta">
							<span className="comment-author">
								{user.fname} {user.lname}
							</span>
							<span className="comment-time">
								{/*{{formatDate created}}*/}
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