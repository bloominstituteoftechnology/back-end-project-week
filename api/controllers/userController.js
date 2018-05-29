const express = require("express")
const router = express.Router();

const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const createUser = (req, res) => {
  const { username, password } = req.body;
    
  if(!username || !password) {
    res.status(401).json({ message: 'Username and password required.' });
  }
  const newUser = new User(req.body) 
    newUser
      .save()
      .then(savedUser => res.status(201).json(savedUser))
      .catch(err => res.status(500).json(err));
};

router.route("/")
    .get(Get)
    .post(Post)

router.route('/:id')
    .get(Get_Id)
    .put(Put)
    .delete(Delete)

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

module.exports = router, {
  createUser
};
