var SparkPost = require('sparkpost');
var VARS = require('./variables.js');

module.exports = function() {

  var client = new SparkPost(VARS.sparkpost.key);

  module.exports.sendRegistrationEmail = function(user) {
    client.transmissions.send({
      transmissionBody: {
        content: {
          from: VARS.sparkpost.email,
          subject: 'Реєстрація "И так поймут"',
          html:'<html><body><p>Привіт '+user.fullName()+'!<br><br>Вас успішно зареєстровано.</p></body></html>'
        },
        recipients: [
        {address: user.email}
        ]
      }
    }, function(err, res) {
      if (err) {
        console.log('Whoops! Something went wrong');
        console.log(err);
      }
    });
  };

  module.exports.sendForgotPasswordEmail = function(email, token) {
    client.transmissions.send({
      transmissionBody: {
        content: {
          from: VARS.sparkpost.email,
          subject: 'Відновлення пароля "И так поймут"',
          html:'<html><body><p>Ви отримали цей лист, тому що ви (чи хтось інший) надіслав запит на відновлення вашого пароля.<br><br>' +
                'Будь ласка, натисніть на посилання, або скопіюйте його у браузер, щоб завершити процес:<br><br>' +
                VARS.baseUrl + '/reset/' + token + '<br><br>' +
                'Посилання діятиме протягом наступних 24 годин.<br><br>' +
                'Якщо ви проігноруєте цей лист, то ваш пароль залишиться незмінним.</p></body></html>'
        },
        recipients: [
        {address: email}
        ]
      }
    }, function(err, res) {
      if (err) {
        console.log('Whoops! Something went wrong');
        console.log(err);
      }
    });
  };
};