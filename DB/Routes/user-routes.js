const express = require('express')
const router = express.router()
const userDB = require('../DB-Functions/User-Functions')

router.post('/', (req, res) => {
 
 userDB('users')
   .then()
   .catch(() => {
   
  })
})

router.post('/', (req, res) => {
 userDB('users')
  .then()
  .catch(() => {
   
  })
})

module.exports.router