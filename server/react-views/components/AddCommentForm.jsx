import React from 'react';
import avatar from '../helpers/avatar';

class AddCommentForm extends React.Component {

	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}

	submit(evt) {
		evt.preventDefault();
	}

	render() {
		return (
			<form action="/addComment" className="add-comment" method="post" onSubmit={this.submit}>
				<input type="hidden" name="_company" value={this.props.companyId}></input>
				<h2>
					Додати коментар
				</h2>
				<div className="comment-row">
					<div className="add-comment-image">
						<img src={avatar(this.props.user.picture_url)} />
					</div>
					<textarea placeholder="Введіть ваш коментар" name="text" maxLength="500"></textarea>
				</div>
				<div className="right-content">
					<button className="dialog__button" type="submit">Додати коментар</button>
				</div>
			</form>
		)
	}

}

AddCommentForm.propTypes = {
	companyId: React.PropTypes.string.isRequired,
	user: React.PropTypes.object.isRequired
}

export default AddCommentForm;