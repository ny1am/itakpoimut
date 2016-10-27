var exphbs = require('express-handlebars');

module.exports = function (app, config) {
	var hbs = exphbs.create({
        layoutsDir: config.rootPath + '/server/views/dist/layouts',
        partialsDir: [
            config.rootPath + '/server/views/dist/includes',
            config.rootPath + '/server/views/dist/partials'
        ],
        defaultLayout: 'main',
        helpers: require(config.rootPath + '/shared/js/handlebars-helpers').getHelpers()
    });
    
    app.engine('handlebars', hbs.engine);
    app.set('views', config.rootPath + '/server/views/dist');
    app.set('view engine', 'handlebars');
};