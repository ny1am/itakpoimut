import React, {Component} from 'react';

import Layout from '../layouts/Main';

import Comments from '../components/Comments';
import NewCompanies from '../components/NewCompanies';

class LandingPage extends Component {
	render() {
		//get rid of page_url somehow
		return (
			<Layout page_url={this.props.page_url} loggedUser={this.props.loggedUser}>
				<div className="pattern bottom-space">
					<div className="container">
						<NewCompanies companies={this.props.newCompanies} />
						<Comments comments={this.props.comments} />
					</div>
				</div>
			</Layout>
		);
	}
}

export default LandingPage;