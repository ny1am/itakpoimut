import React from 'react';
import loyaltySingleByName from '../helpers/loyaltySingleByName.js';

//todo: refactor css names)
class CompanyOverview extends React.Component {
	render() {
		const company = this.props.company;
		return (
			<div className="result-row">
				<a href={"/company/"+company._id} className="result-row-logo">
					<img src={company.img} />
				</a>
				<div className="result-row-body">
					<a href={"/company/"+company._id}>
						{company.title}
					</a>
					<p className="result-row-desc">
						{company.description}
					</p>
				</div>
				<div className="result-row-loyalty">
					<div className={"loyalty-mark "+company.loyalty}>
						{loyaltySingleByName(company.loyalty)}
					</div>
				</div>
			</div>
		);
	}
}

CompanyOverview.propTypes = {
	company: React.PropTypes.object.isRequired
}

export default CompanyOverview;