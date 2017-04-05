import React, {Component} from 'react';

import DesktopHeader from './components/DesktopHeader.jsx';
import MainMenu from './components/MainMenu.jsx';
import MobileHeader from './components/MobileHeader.jsx';
import MobileMenu from './components/MobileMenu.jsx';
import Footer from './components/Footer.jsx';

import VARS from '../../config/variables.js';

class MainLayout extends Component {
	renderDialog() {
		if (this.props.dialog) {
			return <div id="dialog" className="dialog hidden"></div>
		} else {
			return null;
		}
	}
	render() {
		return (
			<html lang="uk">
				<head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<title>&laquo;И так поймут&raquo; каталог ЗМІ та бізнесу</title>
					<base href={VARS.baseUrl+"/"} />
					<link rel="shortcut icon" href="/favicon.ico" />
					<link rel="stylesheet" type="text/css" href={"css/main-"+VARS.versionHash+".css"} />
					<meta property="og:title" content='&laquo;И так поймут&raquo; каталог ЗМІ та бізнесу' />
					<meta property="og:type" content="website" />
					<meta property="og:image" content={VARS.baseUrl+"/img/social.png"} />
				</head>
				<body className={this.props.bodyClass} id="top">
					<DesktopHeader loggedUser={this.props.loggedUser} />
					<MainMenu loggedUser={this.props.loggedUser} />
					<MobileHeader loggedUser={this.props.loggedUser} page_url={this.props.page_url} />
					<MobileMenu loggedUser={this.props.loggedUser} page_url={this.props.page_url} />
					<main className="site-content" id="content">
						{this.renderDialog()}
						<div id="main-content">
							{this.props.children}
						</div>
					</main>
					<Footer loggedUser={this.props.loggedUser} page_url={this.props.page_url} />
					<script src={"js/main-"+VARS.versionHash+".js"}></script>
				</body>
			</html>
		);
	}
}

MainLayout.defaultProps = {
	bodyClass: 'site',
	dialog: true
}

export default MainLayout;