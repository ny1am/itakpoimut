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
var rememberMe = require('../config/passport-remember-me.js');
var forgotPassword = require('../controllers/forgotPassword');
var resetPassword = require('../controllers/resetPassword');
var VARS = require('./variables.js');


module.exports = function (app) {


    app.get('*',function(req, res, next) {
        if(req.headers['x-forwarded-proto'] != 'https') {
            res.redirect(VARS.baseUrl+req.url);
        } else {
            next();
        }
    });

    app.get('/', landing.get);

    app.get('/about', function (request, response) {
        response.render('pages/about', {layout: 'main--fullpage'});
    });

    app.get('/login', function (request, response) {
        response.render('partials/login', {message: request.flash('message')});
    });
    app.post('/login', auth.authenticate);

    app.get('/auth/facebook', auth.fbAuthenticate);
    app.get('/auth/facebook/callback', auth.fbAuthenticateCb);

    app.get('/auth/google', auth.googleAuthenticate);
    app.get('/auth/google/callback', auth.googleAuthenticateCb);

    app.get('/logout', rememberMe.clearCookieMiddleware, function (request, response) {
        request.logout();
        return response.redirect('/');
    });

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

    app.get('/403', function (request, response) {
        response.render('misc/403', {layout: 'main--fullpage'});
    });

    app.get('/404', function (request, response) {
        response.render('misc/404', {layout: 'main--fullpage'});
    });

};