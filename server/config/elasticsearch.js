var elasticsearch = require('elasticsearch');
var VARS = require('./variables.js');

// todo: revise this file
module.exports = function () {
	
	var client = new elasticsearch.Client(VARS.elasticsearch);

	
	elasticsearch.indexCompany = function (company, callback) {
		client.index({
			index: 'company',
			type: 'company',
			id: company._id,
			body: {
				title: company.title,
				categories: company.categories
			}
		}, function (error, response) {
			callback(error, response);
		});
	};

	elasticsearch.deleteCompany = function (id, callback) {
		client.delete({
			index: 'company',
			type: 'company',
			id: id
		}, function (error, response) {
			callback(error, response);
		});
	};

	elasticsearch.autocomplete = function(params, callback) {
		client.search({
			index: 'company',
			type: 'company',
			size: 4,
			body: {
				"query": {
					"match": {
						"title": {
							"query": params.term,
							"analyzer": "standard"
						}
					}
				}
			}
		}).then(function (resp) {
			var results = resp.hits.hits.map(function(hit){
				return {
					_id: hit._id,
					title: hit._source.title
				};
			});
			callback(results);
		}, function (err) {
			callback(null, err);
		});
	}

	function reIndex() {
		deleteIndex(function() {
			createIndex(function() {
				indexData();
			});
		});
	}

	// reIndex();

	function deleteIndex(callback) {
		client.indices.delete({
			index: 'company'
		}, function(err, res) {
			console.log(res);
			callback(res);
		});
	}

	function createIndex(callback) {
		client.indices.create({
			index: 'company',
			body: {
				"settings": {
					"analysis": {
						"filter": {
							"autocomplete_filter": {
								"type": "edge_ngram",
								"min_gram": 1,
								"max_gram": 10
							}
						},
						"analyzer": {
							"autocomplete": {
								"type": "custom",
								"tokenizer": "standard",
								"filter": [
								"lowercase",
								"autocomplete_filter"
								]
							}
						}
					}
				},
				"mappings": {
					"company": {
						"properties": {
							"title": {
								"type": "string",
								"analyzer": "autocomplete",
								"search_analyzer": "standard"
							},
							"categories": {
								"type": "string",
								"index": "not_analyzed"
							}
						}
					}
				}
			}
		}, function (error, response) {
			console.log(response);
			callback(response);
		});
	}

	// todo: use batch
	function indexData() {
		var Company = require('mongoose').model('Company');
		Company.find({published: true})
		.exec(function (err, docs) {
			docs.forEach(function(doc) {
				client.index({
					index: 'company',
					type: 'company',
					id: doc._id,
					body: {
						title: doc.title,
						categories: doc.categories
					}
				}, function(error, response) {
					console.log(response);
				});
			});
		});
	}    
}