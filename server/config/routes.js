var auth = require('./auth');
var userSignup = require('../controllers/userSignup');
var companies = require('../controllers/companies');
var company = require('../controllers/company');
var addСompany = require('../controllers/addСompany');
var addComment = require('../controllers/addComment');
var addViolation = require('../controllers/addViolation');
var addCategory = require('../controllers/addCategory');
var userProfile = require('../controllers/userProfile');
var changePassword = require('../controllers/changePassword');
var landing = require('../controllers/landing');
var autocomplete = require('../controllers/autocomplete');
var forgotPassword = require('../controllers/forgotPassword');
var resetPassword = require('../controllers/resetPassword');
var statics = require('../controllers/statics');


module.exports = function (app) {

	app.get('/', landing.get);

	app.get('/login', auth.show);
	app.post('/login', auth.authenticate);

	app.get('/auth/facebook', auth.fbAuthenticate);
	app.get('/auth/facebook/callback', auth.fbAuthenticateCb);

	app.get('/auth/google', auth.googleAuthenticate);
	app.get('/auth/google/callback', auth.googleAuthenticateCb);

	app.get('/logout', auth.logout);

	app.get('/signup', userSignup.get);
	app.post('/signup', userSignup.post);

	app.get('/forgot', forgotPassword.get);
	app.post('/forgot', forgotPassword.post);

	app.get('/reset/:token', resetPassword.get);
	app.post('/reset', resetPassword.post);

	app.get('/userProfile', auth.roleUser, userProfile.get);
	app.post('/userProfile', auth.roleUser, userProfile.post);

	app.get('/changePassword', auth.roleUser, changePassword.get);
	app.post('/changePassword', auth.roleUser, changePassword.post);

	app.get('/createCompany', auth.roleUser, addСompany.get);
	app.post('/createCompany', auth.roleUser, addСompany.post);

	app.get('/company/:id', company.get);

	app.post('/addComment', auth.roleUser, addComment.post);

	app.get('/addViolation', auth.roleUser, addViolation.get);
	app.post('/addViolation', auth.roleUser, addViolation.post);

	app.get('/addCategory', auth.roleUser, addCategory.get);
	app.post('/addCategory', auth.roleUser, addCategory.post);

	app.get('/companies', companies.get);
	app.post('/companies', companies.post);

	app.get('/autocomplete', autocomplete.get);

	app.get('/about', statics.about);

	app.get('/403', statics.forbidden);

	app.get('/404', statics.notfound);

	app.use(statics.notfound)

};