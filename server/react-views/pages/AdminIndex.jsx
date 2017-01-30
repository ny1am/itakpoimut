import React from 'react';

import Layout from '../layouts/Admin';

class AdminIndexPage extends React.Component {
	render() {
		const style={height: 500};
		return (
			<Layout page_url={this.props.page_url} loggedUser={this.props.loggedUser}>
				<div style={style}>
				</div>
			</Layout>
		);
	}
}

export default AdminIndexPage;