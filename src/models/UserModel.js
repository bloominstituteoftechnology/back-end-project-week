const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

UserSchema.pre('save', function(next) {
	bcrypt.hash(this.passwordHash, 11, (err, hash) => {
		if (err) return next(err);
		this.passwordHash = hash;
		next();
	});
});

UserSchema.methods.checkPassword = function(potentialPass, cb) {
	bcrypt.compare(potentialPass, this.passwordHash, (err, isMatch) => {
		if (err) return cb(err);
		cb(null, isMatch);
	});
}

module.exports = mongoose.model('User', UserSchema);
