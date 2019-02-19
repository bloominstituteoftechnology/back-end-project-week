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