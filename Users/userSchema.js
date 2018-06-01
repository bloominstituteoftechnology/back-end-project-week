import mongoose from 'mongoose';
import Bcrypt from 'bcrypt';

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

export default User;

module.exports = mongoose.model('User', userSchema, 'users');