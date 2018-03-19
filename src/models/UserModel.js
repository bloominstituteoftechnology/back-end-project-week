const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

		firstName: {
			type: String,
			required: true,
			index: true
		},
		lastName: {
			type: String,
			required: true,
			index: true
		},
		email: {
			type: String,
			required: true
		},
		passwordHash: {
			type: String,
			required: true
		}
});

module.exports = mongoose.model('User', UserSchema);
