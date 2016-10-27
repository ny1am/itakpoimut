var elasticsearch = require('elasticsearch');
var Company = require('mongoose').model('Company');

exports.get = function(params, callback) {
	var term = params.term;
    if (!term) {
        Company.find({'published': true})
        .sort({sort_title: 'asc'})
        .select('_id title img loyalty')
        .limit(5).exec(callback);
    } else {
         elasticsearch.autocomplete(term, function(results, err) {
            if (err) {
                return callback(err);
            } else {
                if (results.length > 0) {
                    Company.find(
                        {_id: 
                            {$in: results.map(function(element) {
                                return element._id;
                            })}
                        }
                      )
                    .select('_id title img loyalty')
                    .limit(5).exec(callback);
                } else {
                    return callback(null, []);
                }
            }
        });
    }
};