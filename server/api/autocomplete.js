var elasticsearch = require('elasticsearch');
var Company = require('mongoose').model('Company');

exports.get = function(params, callback) {
    if (!params.term) {
        var findQuery = {'published': true};
        if (params.category) {
            findQuery.categories = params.category;
        }
        Company.find(findQuery)
        .sort({sort_title: 'asc'})
        .select('_id title img loyalty')
        .limit(5).exec(callback);
    } else {
         elasticsearch.autocomplete(params, function(results, err) {
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