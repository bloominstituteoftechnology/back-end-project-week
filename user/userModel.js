const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	notes: [{type: ObjectId, ref: 'Note'}]
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;




