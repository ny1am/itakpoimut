import React from 'react';
import MainLayout from './Main';

class PatternLayout extends React.Component {
	render() {
		return (
			<MainLayout loggedUser={this.props.loggedUser} page_url={this.props.page_url} bodyClass="site" dialog={false}>
				<div className="pattern-content">
					<div className="container">
						{this.props.children}
					</div>
				</div>
			</MainLayout>
		);
	}
}

export default PatternLayout;