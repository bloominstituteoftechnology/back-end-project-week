require('dotenv').config()
const express = require('express')
const router = express.router()
const bcrypt = require('bcryptjs')
const userDB = require('../DB-Functions/User-Functions')

const makeToken = () => {
 const payload = {

 },

 const secret ;

 const options = {

 },

 return jwt.sign(payload, secret, options)
}

router.post('/', (req, res) => {
 const user = req.body
 const pw_hash = bcrypt.hashSync(user.password, 16)
 user.password = pw_hash 
 userDB.register(user)
  .then((ids) => {
   res
    .status(201)
    .json({message: "You have successfully registered an account."}, {id: ids[0]})
  })
  .catch((err) => {
   res
    .status(500)
    .json({error: err})
  })
})

module.exports.router