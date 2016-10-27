var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Comment = mongoose.Schema({
	_id: Number,
	_user: {
		type: Number,
		ref: 'User'
	},
	_company: {
		type: Number,
		ref: 'Company'
	},
	text: String,
	created: {
		type: Date
	}
});

Comment.index({ _company: 1, created: -1 });

Comment.plugin(autoIncrement.plugin, {
    model: 'Comment',
    startAt: 1
});

mongoose.model('Comment', Comment);