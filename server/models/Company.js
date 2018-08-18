var mongoose = require('mongoose');
var violations = require('../../shared/js/violations.js');
var autoIncrement = require('mongoose-auto-increment');

var Violation = mongoose.Schema({
    _id: false,
    name: String
});
Violation.path('name').validate(function(element) {
    return violations.isValid(element);
}, "SOMETHING_WENT_WRONG");

var Company = mongoose.Schema({
    id: Number,
    title: {
        type: String,
        unique: true,
        require: true
    },
    sort_title: {
        type: String,
        index: true
    },
    loyalty: String,
    img: String,
    description: String,
    company_site: String,
    cloudinary_public_id: String,
    violations: [Violation],
    categories: [String],
    user_id: Number,
    published: Boolean,
    proposals: Boolean
});
Company.plugin(autoIncrement.plugin, {
    model: 'Company',
    startAt: 1
});
Company.pre('save', function(next) {
  this.sort_title = this.title.toLowerCase();
  //todo: validate categories
  next();
});
Company.post('findOne', function(doc, next) {
    if (!doc) {
        return next(new Error("Company not found"));
    } else {
        return next();
    }
});

mongoose.model('Company', Company);