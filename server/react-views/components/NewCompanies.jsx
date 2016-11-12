import React, {Component} from 'react';
import CompanyPreview from './CompanyPreview';

class NewCompanies extends Component {
	renderPreviews() {
		return this.props.companies.map(item => (
			<li>
				<CompanyPreview company={item} />
			</li>
		));
	}
	render() {
		if (this.props.companies.length === 0) return null;
		return (
			<section className="landing-container">
				<header className="landing-header">
					Нові компанії
				</header>
				<ul className="new-companies">
					{this.renderPreviews()}
				</ul>
			</section>
		);
	}
}

export default NewCompanies;