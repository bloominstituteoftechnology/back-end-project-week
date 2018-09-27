const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwtOptions');
const helpers = require('../db/helpers');

router.post('/api/register', async (req, res) => {
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
});
