(function() {

	var categories = [
		{
			name: 'auto',
			text: 'Авто та мото '
		},
		{
			name: 'everyday',
			text: 'Побутова техніка'
		},
		{
			name: 'computers',
			text: 'Комп’ютери та електроніка'
		},
		{
			name: 'sportorgs',
			text: 'Спорт'
		},
		{
			name: 'sport',
			text: 'Товари для спорту та туризму'
		},
		{
			name: 'hobbies',
			text: 'Товари для хоббі та відпочинку'
		},
		{
			name: 'children',
			text: 'Дитячі товари'
		},
		{
			name: 'clothes',
			text: 'Одяг, взуття та аксесуари'
		},
		{
			name: 'jewelry',
			text: 'Ювелірні товари'
		},
		{
			name: 'office',
			text: 'Канцелярські та офісні товари'
		},
		{
			name: 'furniture',
			text: 'Меблі та предмети інтер’єру'
		},
		{
			name: 'tools',
			text: 'Інструменти та обладнання'
		},
		{
			name: 'food',
			text: 'Продукти харчування'
		},
		{
			name: 'animal',
			text: 'Товари для тварин'
		},
		{
			name: 'makeup',
			text: 'Косметика, засоби гігієни та парфумерія'
		},
		{
			name: 'everyday service',
			text: 'Побутові послуги'
		},
		{
			name: 'chemicals',
			text: 'Побутова хімія, господарчі товари'
		},
		{
			name: 'media',
			text: 'Медіа, ЗМІ, видавнича справа'
		},
		{
			name: 'internet',
			text: 'Інтернет сервіси та послуги'
		},
		{
			name: 'markets',
			text: 'Супермаркети, магазини'
		},
		{
			name: 'e-commerce',
			text: 'Інтернет-торгівля'
		},
		{
			name: 'delivery',
			text: 'Служби доставки'
		},
		{
			name: 'social',
			text: 'Соцмережі'
		},
		{
			name: 'education',
			text: 'Освіта'
		},
		{
			name: 'edu',
			text: 'Навчальні заклади'
		},
		{
			name: 'service',
			text: 'Сфера обслуговування'
		},
		{
			name: 'culture',
			text: 'Культура та мистецтво'
		},
		{
			name: 'tv',
			text: 'Телекомунікаційні послуги',
		}, 
		{
			name: 'transportation',
			text: 'Транспорт'
		}
	];

	exports.list = function() {
		return categories;
	};

	exports.names = function() {
		var result = [];
		for (var index = 0; index < categories.length; index++) {
			result.push(categories[index].name);
		}
		return result;
	};

	exports.getByName = function(name) {
		for (var index = 0; index < categories.length; index++) {
			if (name === categories[index].name) {
				return categories[index];
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

	exports.isValid = function(value) {
		if (exports.getByName(value)) {
			return true;
		} else {
			return false;
		}
	};

	exports.text = function(name) {
		var result = exports.getByName(name);
		if (result) {
			return result.text;
		}
	};

}());