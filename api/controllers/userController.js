const express = require("express")
const router = express.Router();

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
// const config = require('../config');
// const { authenticate } = require("../utilities/middleware");

const Get = (req, res) => {
  User
    .find()
    .then(users => {
      users.length === 0 ?
        res.status(204).json({ message: 'Database empty.' }) :
        res.status(200).json(users)
    })
    .catch(err => res.status(500).json({ error: 'Server error fetching data.' }))
}
const Post = (req, res) => {
 
  User
    .create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ error: 'Server error with new user.' }))
}
const Get_Id = (req, res) => {
  const { id } = req.params;
  User
    .findById(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ message: 'Server error: check Id.' }))
}
const Put = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  User
    .findByIdAndUpdate(id, updates, { new: true })
    .then(updated => res.status(200).json(updated))
    .catch(err => res.status(500).json({ error: 'Server error updating.' }))
}

const Delete = (req, res) => {
  const { id } = req.params;
  User
    .findByIdAndRemove(id)
    .then(deleted => res.status(200).json({ success: 'User deleted.' }))
    .catch(err => res.status(500).json({ error: 'Server error deleting.' }))
}
router.route("/")
  .get(Get)
  .post(Post)

router.route('/:id')
  .get(Get_Id)
  .put(Put)
  .delete(Delete)

module.exports = router;
