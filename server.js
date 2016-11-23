var express = require('express');
var app = express();
var isomorphic = require('./server/config/isomorphic-react.js');

require('./server/config/cloudinary.js')();

require('./server/config/express.js')(app, {
	rootPath: __dirname
});

require('./server/config/validation.js').setup(app);

isomorphic.setup(app, {
	rootPath: __dirname
});

require('./server/config/mongoose.js')();

require('./server/config/passport.js')(app);

require('./server/config/elasticsearch.js')();

require('./server/config/sparkpost.js')();

require('./server/config/routes-https-redirect.js')(app);
require('./server/config/routes-admin.js')(app);
require('./server/config/routes.js')(app);

require('./server/config/rollbar.js')(app);

app.listen(app.get('port'), function () {
	console.log('App is running on port', app.get('port'));
});