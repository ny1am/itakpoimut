exports.show = function(req, res) {
	res.render('pages/admin-index', {
        layout: 'admin'
    });
}