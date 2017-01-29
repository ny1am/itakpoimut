import React from 'react';
import Comment from './Comment';

class Comments extends React.Component {
	render() {
		if (this.props.comments.length === 0) return null;
		return (
			<section className="landing-container">
				<header className="landing-header">
					Останні коментарі
				</header>
				<ul className="comments">
					{this.props.comments.map(item => (
						<li data-href={"/company/"+item._company._id} key={item._id}>
							<Comment comment={item} />
						</li>
					))}
				</ul>
			</section>
		);
	}
}

Comments.defaultProps = {
	comments: []
}

export default Comments;