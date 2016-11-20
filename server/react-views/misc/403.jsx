import React from 'react';

import Layout from '../layouts/FullPage';

class AccessDeniedPage extends React.Component {
	render() {
		return (
			<Layout page_url={this.props.page_url} loggedUser={this.props.loggedUser}>
				<div className="container">
					<div className="full-height">
						<div className="http-error-title">
							403
						</div>
						<div className="http-error-expl">
							Немає доступу
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}

export default AccessDeniedPage;