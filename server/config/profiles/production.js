module.exports = {
	baseUrl: 'http://www.itakpoimut.info',

	cloudinary: {
		cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
	},

	elasticsearch: {
		host: process.env.elasticsearch_host,
		apiVersion: '2.3'
	},

	mongoUrl: process.env.MONGODB_URL,

	rollbar: process.env.ROLLBAR,

	sparkpost: {
		key: process.env.sparkpost_key,
		email: 'itakpoimut@' + process.env.SPARKPOST_SANDBOX_DOMAIN
	},

	facebook: {
		clientID: process.env.FACEBOOK_CLIENT_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET
	},

	google: {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET
	},

	dropbox: {
		app: {
			app_key: process.env.DROPBOX_APP_KEY, 
			app_secret: process.env.DROPBOX_APP_SECRET
		},
		access_token: {
			oauth_token_secret: process.env.DROPBOX_TOKEN_SECRET,
			oauth_token: process.env.DROPBOX_TOKEN,
			uid: process.env.DROPBOX_TOKEN_UID
		}
	}

};