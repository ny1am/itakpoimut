import React, {Component} from 'react';

class CompanyPreview extends Component {
	render() {
		const company = this.props.company;
		return (
			<article className="company-preview">
				<a href={"/company/"+company._id} className="p-company-logo">
					{/*move width attr to css*/}
					<img src={company.img} width=120 />
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

export default CompanyPreview;