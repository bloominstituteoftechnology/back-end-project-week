require('dotenv').load();
const db = require('../data/helpers/userDb');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET;

const sendError = (code, message, error) => {
    return {
        code,
        message,
        error
    }
}

function generateToken(user) {
    const payload = {
      username: user.username
    }
  
    const options = {
      expiresIn: '1h'
    }
  
    return jwt.sign(payload, jwtKey, options);
  }

router.post('/register', async (req, res, next) => {
    if (!(req.body.username && req.body.password)) {
        return next(sendError(400, 'Failed to register.', 'Username or password is missing.'));
      }
    
      const user=req.body;
      const hash = bcrypt.hashSync(user.password, 12);
      user.password = hash;
      try {
        const response = await db.add(user);
        const token = generateToken(user);
        res.status(200).send(token);
      } catch (error) {
        return next(sendError(500, 'Failed to register,', error.message));
      }
})

router.post('/login', async (req, res, next) => {
    if (!(req.body.username && req.body.password)) {
        return next(sendError(400, 'Failed to login.', 'Username or password is missing.'));
      }
    
      const user=req.body;
      try {
        const response = await db.getPassword(user.username);
        const match = bcrypt.compareSync(user.password, response.password);
        if (match) {
          const token = generateToken(user);
          res.status(200).send(token);
        } else {
          return next(sendError(401, 'Failed to login,', 'Invalid login.'));
        }
        
      } catch (error) {
        return next(sendError(500, 'Failed to login,', error.message));
      }
})

module.exports = router;