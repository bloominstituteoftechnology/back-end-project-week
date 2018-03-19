const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

		firstName: {
			type: String,
			require: true
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			require: true
		},
		passwordHash: {
			type: String,
			required: true
		}
});

module.exports = mongoose.model('User', UserSchema);
