(function() {

	var violations = [
		{
			'name':'presentation-site', 
			'text':'Відсутність української на сайті-візитці компанії'
		},
		{
			'name':'ecommerce-site', 
			'text':'Відсутність української на сайті інтернет-магазину компанії'
		},
		{
			'name':'social', 
			'text':'Відсутність української в соцмережах'
		},
		{
			'name': 'docs',
			'text': 'Відсутність інструкцій українською'
		},
		{
			'name':'bills', 
			'text':'Відсутність супроводжуючих документів (рахунки, чеки тощо) українською'
		},
		{
			'name':'advert', 
			'text':'Відсутність рекламних та піар матеріалів українською'
		},
		{
			'name':'package', 
			'text':'Відсутність української на упаковках та етикетках'
		}
	];

	exports.list = function() {
		return violations;
	};

	exports.getByName = function(name) {
		for (var index = 0; index < violations.length; index++) {
			if (name === violations[index].name) {
				return violations[index];
			}
		}
	};

	exports.getByNames = function(names) {
		var result = [];
		if (names) {
			for (var index = 0; index < names.length; index++) {
				result.push(exports.getByName(names[index]));
			}
		}
		return result;
	};

	exports.names = function() {
		return violations.map(function(el) {
			return el.name;
		});
	};

	exports.isValid = function(value) {
		if (exports.names().indexOf(value) > -1) {
			return true;
		} else {
			return false;
		}
	};

	exports.text = function(name) {
		for (var index = 0; index < violations.length; index++) {
            if (violations[index].name === name) {
                return violations[index].text;
            }
        }
	};

}());