import React, {Component} from 'react';
import Comment from './Comment';

class Comments extends Component {
	renderComments() {
		return this.props.comments.map(item => (
			<Comment comment={item} />
		));
	}
	render() {
		return (
			<div>
				{this.renderComments()}
			</div>
		);
	}
}

export default Comments;