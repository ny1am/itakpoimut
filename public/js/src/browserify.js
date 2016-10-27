var Handlebars = require('handlebars');
var hbsHelpers = require('../../../shared/js/handlebars-helpers.js').getHelpers();
for (var prop in hbsHelpers) {
	Handlebars.registerHelper(prop, hbsHelpers[prop]);
};

require('jquery.chosen');
require('jquery.throttle-debounce');
require('../thirdparty/jquery.serialize-object.js');

require('./js-enabled.js');
require('./href.js');
require('./checkbox.js');
require('./radio.js');
require('./multiple-select.js');
require('./password.js');
require('./show-more.js');
require('./file_upload.js');
require('./ajax.js');

require('./autocomplete.js');
require('./company-filters.js');
require('./category-mirror.js');

