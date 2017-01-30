exports.show = function(req, res) {
	res.render('pages/AdminIndex', {
		layout: 'admin'
	});
}