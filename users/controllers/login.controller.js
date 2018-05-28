const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/users.schema")
const router = express.Router()

const LOGIN = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then(user => {
      user.validatePassword(password, (noMatch, isValid) => {
        if (noMatch !== null) res.status(422).json({ fail: 'passwords do not match' })
        if (isValid) {
          const payload = { username: user.username }
          const secret = 'this is my secret. shhhh...'
          const token = jwt.sign(payload, secret)
          res.status(200).json({ token })
        } // res.status(200).json({ success: `welcome, ${user.username}` })
      })
    }).catch(err => res.status(500).json({ error: 'something went really wrong' }))
}

router.route('/')
  .post(LOGIN)

module.exports = router;