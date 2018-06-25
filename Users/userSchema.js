const mongoose = require('mongoose');
const Bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
	}
});

UserSchema.pre('save', function(next) {
  Bcrypt.hash(this.password, 11, (err, hash) => {
 		this.password = hash;
 		return next();
	});
});

UserSchema.methods.validatePassword = async function(password){
	return Bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;