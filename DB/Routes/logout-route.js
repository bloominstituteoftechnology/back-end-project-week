// This file may end up needing
// to be deleted, due to the method
// of logging out required for
// jwt based authZ/authN.

const express = require('express')
const router = express.Router()
const userDB = require('../DB-Functions/User-Functions')
router.post('/', (req, res) => {
 userDB.logout()
 .then(() => {
  res.json({message: "Here."})
 })
 .catch(() => {
  res.json({message: "Here too."})
 })
})

module.exports = router 