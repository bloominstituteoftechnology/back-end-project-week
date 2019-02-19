const express = require('express')
const router = express.Router()
const bcrypt = require ('bcryptjs')
const pw_check = require('../MW-Functions/middleware')
const userDB = require('../DB-Functions/User-Functions')

router.post('/', (req, res) => {
 const user = req.body
 userDB.login()
   .then((users) => {
    res
     .json()
   })
   .catch((err) => {
   res
    .json({err: err})
  })
})

module.exports.router