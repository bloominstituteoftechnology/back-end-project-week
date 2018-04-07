const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const BRYPT_COST = 11;

const UserSchema = new mongoose.Schema({
   userName: {
          type: String,
					required: true,
				},
	 password: {
	     type: String,
			 required: true
			}
		});

UserSchema.pre('save', function(next) {
		bcrypt.hash(this.password, BCRYPT_COST, (err, hash) => {
			if (err) return next(err);
			this.password = hash;
			next();
		});
	});

UserSchema.methods.checkPassword = function(plainTextPW, callBack) {
	 bcrypt.compare(plainTextPW, this.password, (error, isMatch) => {
			 if (error) return callBack(error);
			 callBack(null, isMatch);
			});
  };

const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
