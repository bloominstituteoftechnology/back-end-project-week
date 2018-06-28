const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 12,
	},
});

userSchema.pre('save', function(next) {
	return bcrypt
		.hash(this.password, 10)
		.then(hash => {
			this.password = hash;

			return next();
		})
		.catch(err => {
			return next(err);
		});
	});

userSchema.methods.validatePassword = function(passwordGuess) {
	return bcrypt.compare(passwordGuess, this.password);
};

//I think this is pretty standard as far as user schemas go. You need to have at least a username and password. Then you hash it and set up the validate method later used in authRoutes.

module.exports = mongoose.model('User', userSchema, 'users');
