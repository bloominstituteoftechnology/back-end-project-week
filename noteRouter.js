const express = require('express');
const Note = require('./noteModel');
const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    Note.find({}).then(notes => {
      res.status(200).json(notes);

    })
    .catch(err => {
      res.status(500).json(err);
    });
  })

  .post( (req, res) => {
    const note = new Note(req.body);

    note
    .save().then(savednote=>{
      res.status(201).json(savednote);
    })
    .catch(err => res.status(500).json(err));
    
  });

  router
  .route('/:id')
  .get( (req, res) => {
    note.findById(req.params.id)
    .then(note => {
res.status(200).json(note);
    })
    .catch(err => {
      res.status(500).json(err);
    });
  })

  .delete( (req, res) => {
    const { id } = req.params;
    Note.findByIdAndRemove(id)
    .then(response => {
      if(response === null) {
        res.status(404).json({message:'not found'});
      }else{
      res.status(200).json(response);
      }
    })
    .catch(err => {
      if(err.email === 'CastError'){
        res
        .status(400)
        .json({message:'The id is invalid' });
      }else{
        res.status(500)
        .json({errorMessage:'The note could not be removed', err});
      }
  });
  })

  .put( (req, res) => {
    note.findByIdAndUpdate(req.params.id, req.body)
    .then(response => {
      if(response === null){
        res.status(404).json({ message:'not found'});
      }
      else{
        res.status(200).json(response);
      }
      
    })
    .catch(err =>{
      if(err.email === 'CastError'){
        res.status(400).json({
          message:'The id provided is invalid, please check and try again'
        })
      }
      else{
        res.status(500).json({
          errorMessage:'the message has been removed',err
        })
      }
    })
  });



  module.exports = router;