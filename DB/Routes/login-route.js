const express = require('express')
const router = express.router()
const userDB = require('../DB-Functions/User-Functions')

router.post('/', (req, res) => {
 const user = req.body
 userDB.login()
   .then(() => {
    
   })
   .catch((err) => {
   
  })
})

module.exports.router