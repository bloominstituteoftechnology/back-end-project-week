const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Note = require('./Note.js');

const router = express.Router();

router
.route('/')
.get( (req,res)=>{
  Note.find({})
  .then(response=>{
    res.status(200).send(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
})
.post( (req,res)=>{
  const note = new Note(req.body);
  note.save()
  .then(savedNote=>{
    res.status(200).json(savedNote);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});

module.exports = router;
