var multer = require('multer');

exports.company = function (request, response, callback) {
  return multer({
    dest: './public/uploads/companies/',
    limits: {
      fileSize: 1024 * 1024, //1MB
      files: 1
    },
    rename: function (fieldname, filename) {
      return filename;
    },
    fileFilter: function (req, file, cb) {
      if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        cb(new Error('not allowed mimetype'), false);
      } else {
        cb(null, true);
      }
    }
  }).single('attachment')(request, response, callback);
};

exports.user = function (request, response, callback) {
  return multer({
    dest: './public/uploads/users/',
    limits: {
      fileSize: 1024 * 1024, //1MB
      files: 1
    },
    rename: function (fieldname, filename) {
      return filename;
    },
    fileFilter: function (req, file, cb) {
      if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        cb(new Error('not allowed mimetype'), false);
      } else {
        cb(null, true);
      }
    }
  }).single('userpic')(request, response, callback);
};