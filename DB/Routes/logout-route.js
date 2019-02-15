const express = require('express')
const router = express.router()
const userDB = require('../DB-Functions/User-Functions')
router.post('/', (req, res) => {
 userDB.logout()
 .then(() => {

 })
 .catch(() => {
  
 })
})