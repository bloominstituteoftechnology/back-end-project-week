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
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		}
});

UserSchema.pre('save', function(next) {
	bcrypt.hash(this.password, 11, (err, hash) => {
		if (err) return next(err);
		this.password = hash;
		next();
	});
});

UserSchema.methods.checkPassword = function(potentialPass, cb) {
	bcrypt.compare(potentialPass, this.password, (err, isMatch) => {
		if (err) return cb(err);
		cb(isMatch);
	});
}

module.exports = mongoose.model('User', UserSchema);
