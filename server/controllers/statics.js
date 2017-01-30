exports.about = function (req, res) {
	res.render('pages/About');
};

exports.forbidden = function (req, res) {
	res.render('misc/403');
};

exports.notfound = function (req, res) {
	res.render('misc/404');
};