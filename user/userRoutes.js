const express = require('express');
const User = require('./userModel.js');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

userRouter.post('/signup', function(req, res){
	const { name, email, password } = req.body;
	const user = new User();
	user.name = name;
	user.email = email;

	bcrypt.hash(password, 11, (err, hash) => {
		if (err) throw err;
		user.password = hash;
		user.save().then(savedUser => {
			res.json(savedUser);
		});
	});
});

userRouter.post('/login', function(req, res){
	const { email, password } = req.body;
	User.findOne({ email }).then(user => {
		if(!user){
			res.json({success: false, message: 'Wrong email or password'});
		}
		if(user){
			userObject = {
			username: user.name,
			email: user.email,
			userId: user._id
		}
			bcrypt.compare(password, user.password, function(err, valid) {
    			if(!valid){
    				res.json({success: false, message: 'Wrong email or password'});
    			}else{
    				const token = jwt.sign(userObject, 'TOKEN_SECRET', { expiresIn: '1000h' });
        		   res.json({success: true, token: token, name: user.name });
        		}
			});
		}
	});
});

module.exports = userRouter;