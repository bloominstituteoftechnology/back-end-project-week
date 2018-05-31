const express = require('express');
const router = express.Router();
const User = require('./usersModel.js');
const { makeToken } = require('./makeTokenMWR.js')

router.get('/', (req, res) => {

  res.json({ msg: 'login route is working' })


})

router.post('/', (req, res) => {
  const { username, password } = req.body
  console.log('username', username)
  // if (req.body.username === '' || req.body.password === '') {
  //   res.status(500).send('you can not have an empty logins')
  // }
  User
    .findOne({ username })
    .then(p => {
      console.log('p', p);
      if (p) {




        p.checkPassWord(password)
          .then(result => {
            console.log('result', result)
            if (result) {
              const token = makeToken(p)
              res.status(200).json({ msg: "login successful", p, token })
            }
            else {
              res.status(401).json({ msg: "wrong password" })
            }
          })
          .catch(err => { res.status(500).json({ msg: 'error happening', err }) })
      }
      else {
        res.status(401).json({ msg: 'wrong username' })
      }

    })
    .catch(err => {
      res.status(500).json({ msg: err })
    })


})



module.exports = router;
