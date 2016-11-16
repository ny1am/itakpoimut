import React, {Component} from 'react';

import DesktopHeader from './components/DesktopHeader';
import MainMenu from './components/MainMenu';
import MobileHeader from './components/MobileHeader';
import MobileMenu from './components/MobileMenu';
import Footer from './components/Footer';

import VARS from '../../config/variables.js';

class MainLayout extends Component {
	render() {
		return (
			<html lang="uk">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<title>&laquo;И так поймут&raquo; каталог ЗМІ та бізнесу</title>
					<base href={VARS.baseUrl+"/"} />
					<link rel="shortcut icon" href="/favicon.ico" />
					<link rel="stylesheet" type="text/css" href="css/main-.css" />
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
						<div id="dialog" className="dialog hidden"></div>
						{this.props.children}
					</main>
					<Footer loggedUser={this.props.loggedUser} page_url={this.props.page_url} />
					<script src="js/main.js"></script>
				</body>
			</html>
		);
	}
}

MainLayout.defaultProps = {
	bodyClass: 'site'
}

export default MainLayout;