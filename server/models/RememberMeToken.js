var mongoose = require('mongoose');

var RememberMeToken = mongoose.Schema({
	_id: false,
    token: String,
    user_id: Number
});

mongoose.model('RememberMeToken', RememberMeToken);