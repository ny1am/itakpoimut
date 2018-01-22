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
var landing = require('../controllers/landing');
var categories = require('../controllers/categories');
var autocomplete = require('../controllers/autocomplete');
var forgotPassword = require('../controllers/forgotPassword');
var resetPassword = require('../controllers/resetPassword');


module.exports = function (app) {

  app.get('/', landing.get);
  app.get('/categories', categories.get);

  app.post('/login', auth.authenticate);

  app.get('/logout', auth.logout);

  app.post('/signup', userSignup.post);

  app.post('/forgot', forgotPassword.post);

  app.get('/reset/:token', resetPassword.get);
  app.post('/reset', resetPassword.post);

  app.get('/userProfile', auth.roleUser, userProfile.get);
  app.post('/userProfile', auth.roleUser, userProfile.post);

  app.post('/changePassword', auth.roleUser, changePassword.post);

  app.get('/createCompany', auth.roleUser, addСompany.get);
  app.post('/createCompany', auth.roleUser, addСompany.post);

  app.get('/company/:id', company.get);

  app.get('/comments/:id', comments.get);
  app.post('/addComment', auth.roleUser, addComment.post);

  app.get('/addViolation', auth.roleUser, addViolation.get);
  app.post('/addViolation', auth.roleUser, addViolation.post);

  app.post('/addCategory', auth.roleUser, addCategory.post);

  app.get('/companies', companies.get);
  app.post('/companies', companies.post);

  app.get('/autocomplete', autocomplete.get);

};