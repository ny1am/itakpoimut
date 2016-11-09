var expreact = require('express-react-views');

module.exports = function (app, config) {
	app.engine('jsx', expreact.createEngine());
	app.set('views', config.rootPath + '/server/react-views');
	app.set('view engine', 'jsx');
}