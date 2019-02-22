const express = require('express');
const router = express.Router();
const db = require('../server/helpers/authHelpers');
const bcrypt = require('bcryptjs');
const { newToken } = require('../server/MiddleWare/middleware')

router.post('/signup', (req, res) => {
  const user = req.body;
  const hashedPass = bcrypt.hashSync(user.password, 12)
  user.password = hashedPass;
  var username = user.username
  db.insertUser(user)
    .then(insertedUsersId => {
      console.log('\n\n\n\n\n')
      console.log(insertedUsersId)
      console.log('\n\n\n\n\n')
      db.findByID(insertedUsersId)
        .then(user => {
          console.log('\n\n\n\n\n')
          console.log(user)
          console.log('\n\n\n\n\n')
          // const token = (newToken(user));
          // res.status(200).json({ id: user.id, username:username,token:token});
        })
        .catch(err => {
          console.log("error", err);
          res.status(500).json({ error: 'Something went wrong' })
        })
    })
    .catch(err => {
      res.status(500).send(err);
    });
});


router.post('/login', (req, res) => {
  const creds = req.body;
  const username = creds.username
  db.findByUsername(creds.username)
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = newToken(user);
        res.status(200).json({ username: username, token });
      }
    })
    .catch(err => res.send(`${err}`));
})

module.exports = router;