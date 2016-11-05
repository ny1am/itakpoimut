var violations = require('./violations.js');
var categories = require('./categories.js');
var loyalties = require('./loyalties.js');

(function() {
    var helpers = {

        'equals': function equals(v1, v2, options) {
            if(v1 === v2) {
                return options.fn(this);
            };
            return options.inverse(this);
        },

        'toFixed': function toFixed(number, digits) {
            if (number === undefined) {
                return undefined;
            };
            if (!digits) {
                digits = 0;
            };
            return number.toFixed(digits);
        },

        'http': function http(url) {
            //todo revise this hotfix
            if (url.indexOf('http') === 0) {
                return url;
            } else {
                return 'http://'+url;
            }
        },

        'picture': function(picture_url) {
            return picture_url || '/img/no-user-image.png';
        },

        'picture-48': function(picture_url) {
            return picture_url || '/img/no-user-image-48.png';
        },

        'picture-90': function(picture_url) {
            return picture_url || '/img/no-user-image-90.png';
        },

        'companyPicture': function(picture_url) {
            return picture_url || '/img/no-image.png';
        },

        'contains': function contains(element, array, options) {
            //todo: don't like this
            if (!options.fn) {
                return (array && array.indexOf(element) > -1);
            };

            if (array && array.indexOf(element) > -1) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            };
        },

        'pagination': function pagination(currentPage, totalPage, size, options) {
            if (totalPage < 2) {
                return options.inverse(this);
            };
            var startPage, endPage, context;
            startPage = currentPage - Math.floor(size / 2);
            endPage = currentPage + Math.floor(size / 2);
            if (startPage <= 0) {
                endPage -= (startPage - 1);
                startPage = 1;
            };
            if (endPage > totalPage) {
                endPage = totalPage;
                if (endPage - size + 1 > 0) {
                    startPage = endPage - size + 1;
                } else {
                    startPage = 1;
                };
            };
            context = {
                prevPage: currentPage - 1,
                pages: [],
                nextPage: currentPage + 1
            };
            if (context.prevPage < 1) {
                context.prevPage = 1;
            };
            for (var i = startPage; i <= endPage; i++) {
                context.pages.push({
                    page: i,
                    isCurrent: i === currentPage,
                });
            };
            if (context.nextPage > totalPage) {
                context.nextPage = totalPage;
            };
            return options.fn(context);
        },

        'checkbox': function checkbox(id, options) {
            var result = '<div class="checkbox">' 
                + options.fn(this) 
                + '<label for="' + id + '"></label>'
            + '</div>';
            return result;
        },

        'radio': function radio(id, options) {
            var result = '<div class="radio">' 
                + options.fn(this) 
                + '<label for="' + id + '"></label>'
            + '</div>';
            return result;
        },

        //formats date DD/MM/YYYY
        'formatDate': function formatDate(dateString) {
            function leadingZero(number) {
                if (number < 10) {
                    return '0' + number.toString();
                } else {
                    return number.toString();
                };
            };
            var d = new Date(dateString);
            var dformat = [leadingZero(d.getDate()),
               leadingZero(d.getMonth()+1),
               d.getFullYear()].join('.');
            return dformat;
        },

        'violationByName': function(name) {
            return violations.text(name);
        },

        'categoryByName': function(name) {
            return categories.text(name);
        },

        'loyaltyByName': function(name) {
            return loyalties.text(name);
        },

        'loyaltySingleByName': function(name) {
            return loyalties.singleText(name);
        },

        //todo: i don't like this, try to remove
        'hasProperty': function(element, property, options) {
            if (element && element[property] !== undefined) {
                return options.fn(this);
            } else {
                return options.inverse(this);   
            };
        },

        'concat': function() {
            var outStr = '';
            for(var arg in arguments){
                if(typeof arguments[arg]!='object'){
                    outStr += arguments[arg];
                };
            };
            return outStr;
        },

        'roleModerator': function(user, options) {
            if (user && user.roles.indexOf('moderator') !== -1) {
                return options.fn(this);
            } else {
                return options.inverse(this);   
            };
        },

        'roleAdmin': function(user, options) {
            if (user && user.roles.indexOf('admin') !== -1) {
                return options.fn(this);
            } else {
                return options.inverse(this);   
            };
        }

    };

    exports.getHelpers = function() {
        return helpers;
    };

}());