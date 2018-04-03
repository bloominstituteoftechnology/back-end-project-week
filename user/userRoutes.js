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

// ** ANOTHER SOLUTION, SAVE HASH AND SALT IN DB **
 // user.save(function(err) {
 //    var token;
 //    token = user.generateJwt();
 //    res.status(200);
 //    res.json({
 //      "token" : token
 //    });
 //  });

	// user.save().then(savedUser => {
	// 	let token;
	// 	token = user.generateJwt();
	// 	res.status(200).json({"token": token});
	// }).catch(err => {
	// 	res.status(500).json({error: "Unable to save up user: ", err});
	// });
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

userRouter.put('/', function(req, res){
	const { toFollow, follower} = req.body;

	User.findByIdAndUpdate(follower, { $push: { following: toFollow}}, function(err, updated){
		User.findByIdAndUpdate(toFollow, { $push: { followers: follower}, $set: { beingFollowed: true }}, { new: true }, function(err, updatedToFallow){
			res.json(updatedToFallow);
		});
	});
});

module.exports = userRouter;