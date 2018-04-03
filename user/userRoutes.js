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
		userObject = {
			username: user.name,
			userId: user._id
		};
		if(!user){
			res.json({error: 'Wrong email or password'});
		}
		if(user){
			bcrypt.compare(password, user.password, function(err, valid) {
    			if(!valid){
    				res.json({error: 'Wrong email or password'});
    			}
    			const token = jwt.sign(userObject, 'TOKEN_SECRET', { expiresIn: '1000h' });
        		res.json({ token: token, name: user.name });
			});
		}
	});
});

module.exports = userRouter;