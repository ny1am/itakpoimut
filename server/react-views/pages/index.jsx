import React, {Component} from 'react';

import Layout from '../layouts/Main';

import Comments from '../components/Comments';

class LandingPage extends Component {
	render() {
		//property cascading somehow?
		return (
			<Layout page_url={this.props.page_url} loggedUser={this.props.loggedUser}>
				<div className="pattern bottom-space">
					<div className="container">
						<Comments comments={this.props.comments} />
					</div>
				</div>
			</Layout>
		);
	}
}

export default LandingPage;