var mongoose = require('mongoose');
var encryption = require('../utils/encryption');
var autoIncrement = require('mongoose-auto-increment');

var User = mongoose.Schema({
    id: Number,
    username: {
        type: String,
        unique: true
    },
    roles: [String],
    fname: String,
    lname: String,
    email: String,
    picture_url: String,
    cloudinary_public_id: String,
    provider: String,
    facebook_id: String,
    google_id: String,
    salt: String,
    hashed_pwd: String
});
User.plugin(autoIncrement.plugin, {
    model: 'User',
    startAt: 1
});
User.post('findOne', function(doc, next) {
    if (!doc) {
        return next(new Error("User not found"));
    } else {
        return next();
    }
});

User.methods = {
    authenticate: function (password) {
        return encryption.hashPwd(this.salt, password) === this.hashed_pwd;
    },

    fullName: function () {
        return this.fname + ' ' + this.lname;
    },

    isAdmin: function () {
        return this.roles.indexOf('admin') >= 0; 
    },

    addRole: function (role) {
        if (this.roles.indexOf(role) === -1) {
            this.roles.push(role);
        } 
    },

    removeRole: function (role) {
        var index = this.roles.indexOf(role);
        if (index !== -1) {
            this.roles.splice(index, 1);
        }
    }
};

mongoose.model('User', User);