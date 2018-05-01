const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require('./User.js');

const router = express.Router();

router
.route('/')
.get( (req,res) =>{
  User.find({})
  .then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  })
})
.post( (req,res) => {
  const newUser = new User(req.body);
  newUser
  .save()
  .then(response=>{
    res.status(200).json(response);
  })
  .catch(err=>{
    res.status(500).json(err);
  });
});

module.exports = router;
