const express = require('express');
const mongoose = require('mongoose');
const noteRouter = express.Router();
const jwt = require('jsonwebtoken');

const Note = require('./noteModel');
const User = require('../user/userModel');

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res
      .status(422)
      .json({ error: 'User not authorized' });
  }
  jwt.verify(token, 'TOKEN_SECRET' , (authError, decoded) => {
    if (authError) {
      res
        .status(403)
        .json({ error: 'Token invalid, please login', message: authError });
      return;
    }
    req.decoded = decoded;
    next();
  });
};

noteRouter.post('/', validateToken, function(req, res){
  let note = req.body;
  note.user = req.decoded.userId;
  note.collabUsers = [];
  note.collabUsers.push(req.decoded.userId);
	Note.create(note).then(post => {
		res.json(post);
	});
});

noteRouter.post('/add-collab', validateToken, function(req, res){
  const noteId = req.body.note._id;
  const userId = req.body.userToAdd._id;
  Note.findOneAndUpdate({ _id: noteId }, { $push: { collabUsers: userId }, $set: { collab: true }}, { new: true })
  .populate('collabUsers')
  .then(note =>{
    res.json(note);
  }).catch(err => {
    if(err) res.send(err);
  });
});

noteRouter.get('/', validateToken, function(req, res){
  const { userId } = req.decoded;
	Note.find({collabUsers: userId})
  .populate('collabUsers')
  .then(notes => {
		res.json(notes);
	}).catch(err => {
		res.send(err);
	});
});

noteRouter.put('/', validateToken, function(req, res){
  const { id, content, title } = req.body;
  const { userId } = req.decoded;
  Note.findOneAndUpdate({ _id: id, collabUsers: userId }, { $set: { title, content }}, { new: true }, function(err, note){
    if(err){
      res.send(err);
    }
    res.json(note);
  });
});

noteRouter.delete('/:id', validateToken, function(req, res){
  const { id } = req.params;
  const { userId } = req.decoded;
  Note.findOneAndRemove({ _id: id, collabUsers: userId }, function(err, note){
    if(err){
      res.send(err);
    }
    res.json(note);
  });
});

module.exports = noteRouter;
