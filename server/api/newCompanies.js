var Company = require('mongoose').model('Company');

exports.get = function(callback) {
  Company.find({published: true}).select('_id title img').limit(5).sort({_id: 'desc'}).exec(function (err, docs) {
    callback(err, docs);
  });
};