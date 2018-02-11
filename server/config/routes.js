var auth = require('./auth');
var userSignup = require('../controllers/userSignup');
var companies = require('../controllers/companies');
var company = require('../controllers/company');
var comments = require('../controllers/comments');
var addСompany = require('../controllers/addСompany');
var addComment = require('../controllers/addComment');
var addViolation = require('../controllers/addViolation');
var addCategory = require('../controllers/addCategory');
var userProfile = require('../controllers/userProfile');
var changePassword = require('../controllers/changePassword');
var lastComments = require('../controllers/lastComments');
var newCompanies = require('../controllers/newCompanies');
var categories = require('../controllers/categories');
var violations = require('../controllers/violations');
var autocomplete = require('../controllers/autocomplete');
var forgotPassword = require('../controllers/forgotPassword');
var resetPassword = require('../controllers/resetPassword');


module.exports = function (app) {

  app.get('/lastComments', lastComments.get);
  app.get('/newCompanies', newCompanies.get);
  app.get('/categories', categories.get);
  app.get('/violations', violations.get);

  app.post('/login', auth.authenticate);
  app.post('/fb-login', auth.facebookAuth);

  app.get('/logout', auth.logout);

  app.post('/signup', userSignup.post);

  app.post('/forgot', forgotPassword.post);

  app.get('/reset/:token', resetPassword.get);
  app.post('/reset', resetPassword.post);

  app.get('/userProfile', auth.roleUser, userProfile.get);
  app.post('/userProfile', auth.roleUser, userProfile.post);

  app.post('/changePassword', auth.roleUser, changePassword.post);

  app.post('/createCompany', auth.roleUser, addСompany.post);

  app.get('/company/:id', company.get);

  app.get('/comments/:id', comments.get);
  app.post('/addComment', auth.roleUser, addComment.post);

  app.post('/addViolation', auth.roleUser, addViolation.post);

  app.post('/addCategory', auth.roleUser, addCategory.post);

  app.get('/companies', companies.get);
  app.post('/companies', companies.post);

  app.get('/autocomplete', autocomplete.get);

};