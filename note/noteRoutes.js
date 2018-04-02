const express = require('express');
const mongoose = require('mongoose');
const noteRouter = express.Router();
const jwt = require('jsonwebtoken');

const Note = require('./noteModel');
const User = require('../user/userModel');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(req.body);
  console.log('validate token', token);
  if (!token) {
    res
      .status(422)
      .json({ error: 'User not authorized' });
  }
  jwt.verify(token, 'TOKEN_SECRET' , (authError, decoded) => {
    console.log(decoded);
    if (authError) {
      console.log('user not authorized!!');
      res
        .status(403)
        .json({ error: 'Token invalid, please login', message: authError });
      return;
    }
    // sets the decoded JWT/user object on the request object for use in next middleware.
    req.decoded = decoded;
    console.log('decoded', decoded);
    next();
  });
};

noteRouter.post('/', validateToken, function(req, res){
  let note = req.body;
  note.user = req.decoded.userId;
	Note.create(note).then(post => {
		res.json(post);
	});
});

noteRouter.get('/', validateToken, function(req, res){
  const { userId } = req.decoded;
	Note.find({user: userId}).then(notes => {
		res.json(notes);
	}).catch(err => {
		res.send(err);
	});
});

// noteRouter.get('/', function(req, res){
// 	const search =  req.query.search;
// 	if(search){
// 		const filter = new RegExp(search, 'i');
// 		Post.find({$or : [{title: filter}, {cuisine: filter}, {tags: filter}]})
// 		.populate('user', 'name')
// 		.then(posts => {
// 			res.json(posts);
// 		})
// 	} 
// });

// postRouter.get('/:id', function(req, res){
// 	const id = req.params.id;
// 	// find posts that owns by the people 'id user' is following...
// 	if (id){
// 		User.findById(id).then(user => {
// 			Post.find({ 'user' : { $in: user.following } })
// 			.sort({createdOn: -1})
// 			.populate('user')
// 			.then(posts => {
// 				console.log('res posts', posts);
// 			res.json(posts);
// 		})	
// 		});
		
// 	}
// });

// postRouter.post('/', function(req, res){
// 	console.log(req.body);
// 	// Post.find().then(posts => {
// 	// 	res.json(posts);
// 	// });
// });

module.exports = noteRouter;
