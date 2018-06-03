const express = require('express');
const router = express.Router();

// Importing models
let Note = require('../models/note');
let User = require('../models/user');

// Add Note
router.get('/add', function(req,res){
  res.render('add_note', {
    title:'Add Note'
  });
});

// Add Submit POST Route
router.post('/add', function(req,res){
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();

  // Get Errors
  let errors = req.validationErrors();

  if(errors){
    res.render('add_note', {
      errors: errors
    });
  } else {
    let note = new Note();
    note.title = req.body.title;
    note.author = req.user._id;
    note.body = req.body.body;
  
    note.save(function(err) {
      if(err){
        console.log(err);
        return;
      } else {
        req.flash('success', 'Note added');
        res.redirect('/');
      }
    });
  }
});

// Load Edit Form of Single Note
router.get('/edit/:id', function(req,res){
  Note.findById(req.params.id, function(err, note){
    if(note.author != req.user._id){
      req.flash('danger', 'Not authorized.');
      res.redirect('/');
    }
    res.render('edit_note', {
      note:note
    });
  });
});

// Edit Update Submit POST Route
router.post('/edit/:id', function(req,res){
  let note = {};
  note.title = req.body.title;
  note.author = req.body.author;
  note.body = req.body.body;

  let query = {_id:req.params.id}

  Note.update(query, note, function(err) {
    if(err){
      console.log(err);
      return;
    } else {
      req.flash('success', 'Note updated');
      res.redirect('/');
    }
  });
});

// Delete Note
router.delete('/:id', function(req, res){
  if(!req.user._id){
    res.status(500).send();
  }

  let query = {_id:req.params.id}

  Note.findById(req.params.id, function(err, note){
    if(note.author != req.user._id){
      res.status(500).send();
    } else {
      Note.remove(query, function(err){
        if(err){
          console.log(err);
        }
        res.send('Success');
      });
    }
  });
});

// Get Single Note
router.get('/:id', function(req,res){
  Note.findById(req.params.id, function(err, note){
    User.findById(note.author, function(err, user){
      res.render('note', {
        note: note,
        author: user.name
      });
    });
  });
});

// Access control
function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login!');
    res.redirect('/users/login');
  }
}

module.exports = router;