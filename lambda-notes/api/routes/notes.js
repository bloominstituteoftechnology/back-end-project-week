var express = require('express');
var router = express.Router();
var jwt_decode = require('jwt-decode');

const Note = require('../models/note');
const User = require('../models/user');

router.post('/', function(req, res) {
  const userProfile = jwt_decode(req.body.tokenToServer);
  User.findOne({ 'email' : userProfile.email })
  .lean().populate('notes')
  .select('noteTitle')
  .then(user => {
    res.json(user)
  })
});

router.post('/shownote', function(req, res) {
  const noteId = req.body.theNote["_id"];
  Note.findOne({ '_id' : noteId })
  .then(note => {
    res.json(note);
  })
});

router.post('/shownote/delete', function(req, res) {
  const noteId = req.body.noteToDelete["_id"];
  const note = req.body.noteToDelete;
  console.log(note)
  User.update(
    { 'notes': noteId },
    { $pull: { 'notes': noteId } },
    function(err, data){
      if (err) {
        console.log(err, data);
      }
    });

  Note.findOne({ '_id' : noteId })
  .remove()
  .then(note => {
    res.json(note);
  })
});

router.post('/shownote/edit', function(req, res) {
const noteToEdit = req.body.updatedNote
const noteId = req.body.updatedNote["_id"];
Note.update(
  { '_id' : noteId },
  { $set : {noteTitle : req.body.updatedNote["noteTitle"],noteContent : req.body.updatedNote["noteContent"] }},
  function(err, data){
    if (err) {
      console.log(err, data);
    }
  });
});

router.post('/save', function(req, res) {
  const userProfile = jwt_decode(req.body.tokenToServer);
  const newNote = new Note(req.body.newNote);
  newNote.save()
  User.findOneAndUpdate(
    { 'email' : userProfile.email },
    { $push: { notes: newNote } }
    // { $set: { notes: [] } // for emptying user's notes
  )
  .then((newNote) => {
    res.status(200).json(newNote);
  })

  .catch((err) => {
    res.status(500).json({ error: 'There was a server error while adding note', err });
  });
});

module.exports = router;
