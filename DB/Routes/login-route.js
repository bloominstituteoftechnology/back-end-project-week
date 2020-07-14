const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcryptjs')
const pw_check = require('../MW-Functions/middleware')
const userDB = require('../DB-Functions/User-Functions')

const makeToken = (user) => {
 const payload = {
  user: user
 }
 const secret = process.env.JWT_SEC
 const options = {
  expiresIn: "8h",
  jwtid: "e6^$@#AHD*@#D9230gr@J12R2"
 }
 return jwt.sign(payload, secret, options)
}

router.post('/', (req, res) => {
 const user = req.body
 userDB.login(user)
   .then((users) => {
    if (users.length || bcrypt.compareSync(user.password, users[0].password)){
     const token = makeToken(user)
     console.log(token)
     res
      .json({message: "Login successful!", token: token})
    }
    else {
     console.log(user.password, users[0].password)
     res
      .status(401)
      .json({err: "Invalid username or password."})
    }
   })
   .catch((err) => {
    console.error(err)
   res
    .status(500)
    .json(err)
  })
})

module.exports = router