var templates = require('./templates.js');
var $ = require('jquery');

(function() {

    function fillAutocomplete(value) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/autocomplete?term='+value,
            success: function(data, textStatus, jqXHR) {
               var newHtml = templates['autocomplete'](data);
               $('#autocomplete-popup').html(newHtml);
           },
           contentType: 'application/json'
       });
    };

    $(document.body).on('focus', '[data-ajax-autocomplete]',  $.debounce(250, function(evt) {
        var value = $(this).val();
        fillAutocomplete(value);
    }));

    $(document.body).on('keyup', '[data-ajax-autocomplete]',  $.debounce(250, function(evt) {
        var value = $(this).val();
        if (value === '') {
            $('#autocomplete-popup').empty();
            return;
        }
        fillAutocomplete(value);
    }));

    $(document.body).on('click', function() {
      $('#autocomplete-popup').empty();
    });
    
}());