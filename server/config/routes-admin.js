var auth = require('./auth');
var adminCompanies = require('../admin-controllers/companies');
var adminCompany = require('../admin-controllers/company');
var adminUsers = require('../admin-controllers/users');

module.exports = function (app) {
  
  app.get('/admin/companies', auth.roleModerator, adminCompanies.show);
  app.post('/admin/companies', auth.roleModerator, adminCompanies.search);

  app.get('/admin/company', auth.roleModerator, adminCompany.show);
  app.post('/admin/company', auth.roleModerator, adminCompany.save);
  app.get('/admin/deleteCompany', auth.roleModerator, adminCompany.delete);

  app.get('/admin/users', auth.roleAdmin, adminUsers.show);
  app.get('/admin/addModeratorRole', auth.roleAdmin, adminUsers.addModeratorRole);
  app.get('/admin/removeModeratorRole', auth.roleAdmin, adminUsers.removeModeratorRole);
  
};