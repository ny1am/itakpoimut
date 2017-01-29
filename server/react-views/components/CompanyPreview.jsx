import React from 'react';

class CompanyPreview extends React.Component {
	render() {
		const company = this.props.company;
		return (
			<article className="company-preview">
				<a href={"/company/"+company._id} className="p-company-logo">
					<img src={company.img} />
				</a>
				<label className="p-company-title">
					<a href={"/company/"+company._id}>
						{company.title}
					</a>
				</label>
			</article>
		);
	}
}

CompanyPreview.propTypes = {
	company: React.PropTypes.object.isRequired
}

export default CompanyPreview;