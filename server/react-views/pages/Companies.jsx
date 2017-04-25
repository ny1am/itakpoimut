import React from 'react';

import Layout from '../layouts/Main.jsx';
import CompaniesPage from '../components/CompaniesPage.jsx';


class Companies extends React.Component {
	render() {
		return (
			<Layout page_url={this.props.page_url} loggedUser={this.props.loggedUser}>
				<CompaniesPage {...this.props} />
			</Layout>
		);
	}
}

export default Companies;