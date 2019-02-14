const express = require('express')
const router = express.router()
const bcrypt = require('bcryptjs')
const userDB = require('../DB-Functions/User-Functions')

router.post('/', (req, res) => {
 userDB.register()
  .then()
  .catch((err) => {
   
  })
})

module.exports.router