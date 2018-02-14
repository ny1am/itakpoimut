module.exports = {
	baseUrl: 'http://localhost:3000',

	sessionSecret: 'they will guess',

	cloudinary: {
		cloud_name: 'itakpoimut',
		api_key: '181275726616715',
		api_secret: 'jB3OlVxKO3hpgsyibDfo-UzOzog'
	},

	elasticsearch: {
		host: 'https://site:679f4f318ae05ba90b83f13d314353bc@dori-us-east-1.searchly.com',
		apiVersion: '2.4'
	},

	mongoUrl: 'mongodb://itakpoimut:start123@ds013991.mlab.com:13991/itp',

	rollbar: '32b6e4137ad04cbba15c635f751014e8',

	sparkpost: {
		key: 'e509e5e6d0a8175f0e2dd891c202680b7655bf3b',
		email: 'info@local.itakpoimut.info'
	},

	facebook: {
		clientID: '308939522798119',
		clientSecret: '1ef7b5e151f9d62fee35f127a1298a4c'
	},

	google: {
		clientID: '132410874020-p7hkqq8u1kfl5cfflv9fgsk3kiqqj2nf.apps.googleusercontent.com',
		clientSecret: 'IoYHRwk1TxpnI03YAgD-6nUw'
	},

	dropbox: {
		app: {
			app_key: 'o7c19asum6v3duj', 
			app_secret: '4vwr9wurjjn0be1'
		},
		access_token: {
			oauth_token_secret: 'kaawp1q0yltjs5m',
			oauth_token: '0hiqumk5s0lxpx43',
			uid: '38647996'
		}
	}

};