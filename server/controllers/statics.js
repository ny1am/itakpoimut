exports.about = function (req, res) {
	res.render('pages/About', {layout: 'main--fullpage'});
};

exports.forbidden = function (req, res) {
	res.render('misc/403', {layout: 'main--fullpage'});
};

exports.notfound = function (req, res) {
	res.render('misc/404', {layout: 'main--fullpage'});
};