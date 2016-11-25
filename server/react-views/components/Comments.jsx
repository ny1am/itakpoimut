import React from 'react';
import Comment from './Comment';

class Comments extends React.Component {
	renderComments() {
		return this.props.comments.map(item => (
			<li data-href={"/company/"+item._company._id}>
				<Comment comment={item} />
			</li>
		));
	}
	render() {
		if (this.props.comments.length === 0) return null;
		return (
			<section className="landing-container">
				<header className="landing-header">
					Останні коментарі
				</header>
				<ul className="comments">
					{this.renderComments()}
				</ul>
			</section>
		);
	}
}

Comments.defaultProps = {
	comments: []
}

export default Comments;