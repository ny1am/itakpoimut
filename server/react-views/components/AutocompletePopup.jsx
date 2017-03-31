import React from 'react';
import AutocompleteCompany from './AutocompleteCompany.jsx';

class AutocompletePopup extends React.Component {
	render() {
		if (this.props.companies.length > 0 && this.props.shown) {
			return (
				<div className="autocomplete-popup">
					<ul className="autocomplete-results">
						{this.props.companies.map(company => (
							<li className="ac-results-row-h" key={company._id}>
								<AutocompleteCompany company={company} />
							</li>
						))}
					</ul>
				</div>
			);
		} else {
			return null;
		}
	}
}

AutocompletePopup.propTypes = {
	companies: React.PropTypes.array.isRequired,
	shown: React.PropTypes.bool.isRequired
}

export default AutocompletePopup;