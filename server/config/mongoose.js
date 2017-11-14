var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var VARS = require('./variables.js');

module.exports = function() {
  mongoose.connect(VARS.mongoUrl);
  var db = mongoose.connection;
  autoIncrement.initialize(db);

  db.on('error', console.error.bind(console, 'db connection error!!!'));
  db.once('open', function() {
    console.log('database connected');
  });

  require('../models/User');
  require('../models/Company');
  require('../models/Comment');
  require('../models/ResetPasswordToken');
  require('../models/Proposed');
};