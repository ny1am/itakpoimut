import React, {Component} from 'react';
import Comments from '../components/Comments';

class LandingPage extends Component {
	render() {
		return (
			<div>
				<Comments comments={this.props.comments} />
			</div>
		);
	}
}

export default LandingPage;