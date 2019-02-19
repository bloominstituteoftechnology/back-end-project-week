const express = require('express')
const router = express.Router()
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
  notBefore: "4h",
  jwtid: "e6^$@#AHD*@#D9230gr@J12R2",

 }

 return jwt.sign(payload, secret, options)
}

router.post('/', (req, res) => {
 const user = req.body
 userDB.login()
   .then((users) => {
    if (users.length && bcrypt.compareSync(user.password, users[0].password)){
     const token = makeToken(user)
     res
      .json({message: "Login successful!"}, token)
    }
    else {
     res
      .status(401)
      .json({err: "Invalid username or password."})
    }
   })
   .catch((err) => {
   res
    .json({err: err})
  })
})

module.exports.router