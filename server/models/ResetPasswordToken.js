var mongoose = require('mongoose');

var ResetPasswordToken = mongoose.Schema({
	_id: false,
    token: String,
    expires: Date,
    user_id: Number
});

mongoose.model('ResetPasswordToken', ResetPasswordToken);