const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true,
		lowercase: true,
		required: true
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

UserSchema.methods.checkPassword = function(potentialPassword, cb) {
	bcrypt.compare(potentialPassword, this.password, (err, isMatch) => {
		if (err) {
			return cb(err)
		};
		cb(null, isMatch);
	});
};

// mongoose.connect('mongodb://localhost/users-db');

module.exports = mongoose.model('User', UserSchema);