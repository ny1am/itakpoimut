var React = require('react');

class Loading extends React.Component {
	render() {
		return (
			<section id="loading" className="ctnr">
				<div className="ldr">
					<div className="ldr-blk"></div>
					<div className="ldr-blk an_delay"></div>
					<div className="ldr-blk an_delay"></div>
					<div className="ldr-blk"></div>
				</div>
			</section>
		);
	}
}

module.exports = Loading;