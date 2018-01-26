var Comment = require('mongoose').model('Comment');

exports.get = function(callback) {
  Comment
    .find({})
    .limit(5)
    .sort({_id: 'desc'})
    .populate('_company', 'title')
    .populate('_user', 'fname lname picture_url')
    .exec(function (err, doc) {
      callback(err, doc);
    });
};