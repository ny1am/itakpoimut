var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Proposed = mongoose.Schema({
	_id: Number,
    type: String,
    company_id: Number,
    values: [String],
    user_id: Number
});

Proposed.plugin(autoIncrement.plugin, {
    model: 'Proposed',
    startAt: 1
});

mongoose.model('Proposed', Proposed);