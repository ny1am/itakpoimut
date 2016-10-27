var jquery = require('jquery');

(function(){

    var $publisher = $({});

    exports.subscribe = function(topic, listener) {
        $publisher.on(topic, function(event, info) {
            listener(info);
        });
    };
    
    exports.publish = function(topic, info) {
        $publisher.trigger(topic, info || {});
    };

}());