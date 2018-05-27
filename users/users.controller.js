const express = require("express")
const router = express.Router()
const User = require("./users.schema")

const GET = (req, res) => {
  User
    .find()
    .then(users => {
      return users.length <= 0 ?
        res.status(204).json({ message: 'there are no users is our database' }) :
        res.status(200).json(users)
    })
    .catch(err => res.status(500).json({ error: 'you broke the server. thanks for nothing.' }))
}

const POST = (req, res) => {
  User
    .create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ error: 'cannot create new users at this time.' }))
}

router.route('/')
  .get(GET)
  .post(POST)

module.exports = router;