var api = require('../api/resetPassword.js');

exports.get = function(req, res, next) {
	return res.send({token: req.params.token});
};

exports.post = [
  function exec(req, res, next) {
    api.post({
     password: req.body.password,
     tokenString: req.body.token
   }, function(err, model) {
     if (err) {
      return next(err);
    } else if (model.result === 'error') {
      return res.status(400).send(model);
    } else {
      next();
    }
  })
  },

  function result(req, res) {
    return res.send({message: 'Пароль успішно змінено!'});
  }
];