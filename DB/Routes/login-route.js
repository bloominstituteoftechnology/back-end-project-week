const express = require('express')
const router = express.router()
const bcrypt = require ('bcryptjs')
const { pw_check } = require('../MW-Functions/middleware')
const userDB = require('../DB-Functions/User-Functions')

router.post('/', pw_check, (req, res) => {
 const user = req.body
 userDB.login()
   .then((users) => {
    
   })
   .catch((err) => {
   
  })
 

})

module.exports.router