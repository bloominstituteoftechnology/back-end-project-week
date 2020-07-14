const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();
const jwtKey = require('../../_secrets/keys').jwtKey;
const db = require('../../database/dbConfig');

function generateToken(id) {
  const payload = {
    id,
  };
  const options = {
    expiresIn: '1h',
    jwtid: '12345',
    subject: `${id}`,
  };
  return jwt.sign(payload, process.env.SECRET || jwtKey, options);
}

router.post('/register', (req, res, next) => {
  let { username, password } = req.body;
  if (!username || !password) next({ code: 400 });
  body.password = bcrypt.hashSync(password, 12);
  db('users')
    .insert({ username, password })
    .then(([id]) => {
      const token = generateToken(id);
      res.json({
        error: false,
        message: 'User created successfully',
        user: id,
        token,
      });
    })
    .catch(next);
});

router.post('/login', (req, res, next) => {
  let { username, password } = req.body;
  if (!username || !password) next({ code: 400 });
  db('users')
    .where({ username: username })
    .first()
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user.id);
        return res.json({
          error: false,
          message: 'Log in Successful',
          user: user,
          token,
        });
      } else next({ code: 404 });
    })
    .catch(next);
});

module.exports = router;
