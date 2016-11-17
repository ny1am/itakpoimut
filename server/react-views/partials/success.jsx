import React from 'react';

class SuccessDialog extends React.Component {
	render() {
		return (
			<div id="dialog" className="dialog">
				<div id="dialog_content" className="dialog_content">
					<h1 className="dialog__h1">
						{this.props.dialog_title}
					</h1>
					<div className="success-figure"></div>
					<p dangerouslySetInnerHTML={{__html: this.props.dialog_body}} />
				</div>
			</div>
		);
	}
}

export default SuccessDialog;