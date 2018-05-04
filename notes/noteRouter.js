const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Note = require('./Note.js');

const router = express.Router();

router
.route('/:id')
.delete((req,res)=>{
  Note.findById(req.params.id).remove()
  .then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  })
})
.put((req,res)=>{
  Note.findOneAndUpdate(new ObjectId(req.params.id),req.body,{upsert:false})
  .then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});
router
.route('/')
.get( (req,res)=>{
  Note.find({username:req.user.username})
  .then(response=>{
    res.status(200).send(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
})
.post( (req,res)=>{
  const {text, title} = req.body;
  const note = new Note({title,text,username:req.user.username});
  note.save()
  .then(savedNote=>{
    res.status(200).json(savedNote);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
})
module.exports = router;
