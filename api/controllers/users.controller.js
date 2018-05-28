const express = require("express")
const router = express.Router()
const User = require("../models/users.schema")
const Note = require("../models/notes.schema")

const GET = (req, res) => {
  User
    .find()
    .then(users => {
      users.length === 0 ?
        res.status(204).json({ message: 'there are no users is our database' }) :
        res.status(200).json(users)
    })
    .catch(err => res.status(500).json({ error: 'you broke the server. thanks for nothing' }))
}

const POST = (req, res) => {
  User
    .create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ error: 'cannot create new users at this time' }))
}

const PUT = (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  User
    .findByIdAndUpdate(id, updates, { new: true })
    .then(updated => res.status(200).json(updated))
    .catch(err => res.status(500).json({ error: 'cannot update user at this time' }))
}

const DELETE = (req, res) => {
  const { id } = req.params;
  User
    .findByIdAndRemove(id)
    .then(deleted => res.status(200).json({ success: 'user successfully deleted' }))
    .catch(err => res.status(500).json({ error: 'cannot delete this user' }))
}

router.route('/')
  .get(GET)
  .post(POST)

router.route('/:id')
  .put(PUT)
  .delete(DELETE)

module.exports = router;