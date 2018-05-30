const mongoose = require('mongoose');
// const server = require('./server');
const uri = process.env.MONGODB_URI;
const { dbLogin, dbPw } = require('./dbConfig.js');

module.exports = {
	connect: function() {
		if (uri) {
			return mongoose.connect(uri);
		}
		return mongoose.connect(
			`mongodb://${dbLogin}:${dbPw}@ds141320.mlab.com:41320/backend-project-db`,
		);
	},
};
