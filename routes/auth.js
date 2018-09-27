const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtOptions');
const helpers = require('../db/helpers');

function asyncWrapper(handler) {
  return async function(req, res, next) {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

router.post(
  '/register',
  asyncWrapper(async (req, res, next) => {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !email || !password) {
      return res.json({
        error: 'First name, email and password are required for registration.',
      });
    }

    let [id] = await helpers.addUser({
      first_name,
      last_name: last_name || '',
      email,
      password,
    });

    const token = jwt.sign({ id }, jwtOptions.secretOrKey, {
      expiresIn: '6h',
    });

    res.json({ message: 'User registered successfully', token });
  }),
);

router.post(
  '/login',
  asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ error: 'Email or password not supplied' });

    helpers.authenticateUser(email, password, (err, userId) => {
      if (err || !userId) {
        return res.json({ error: err || 'Invalid credentials' });
      }
      const token = jwt.sign({ id: userId }, jwtOptions.secretOrKey, {
        expiresIn: '6h',
      });
      return res.json({ message: 'Login successful', token });
    });
  }),
);

module.exports = router;
