var dbox  = require("dbox");

var app = dbox.app({ 'app_key': '', 'app_secret': '' });

// app.requesttoken(function(status, request_token){
// 	console.log(request_token);
// });

var request_token = { oauth_token_secret: '',
  oauth_token: '',
  authorize_url: 'https://www.dropbox.com/1/oauth/authorize?oauth_token=' };
app.accesstoken(request_token, function(status, access_token){
	console.log(access_token)
});

var at = { oauth_token_secret: '',
  oauth_token: '',
  uid: '' };