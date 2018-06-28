require('dotenv').config();

const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');

const generateToken = payload => {
  const options = {
    expiresIn: '1h'
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ error: 'Access denied. Invalid token.' });
    } else {
      req.tokenPayload = decodedToken;
      next();
    }
  });
};

module.exports = {
  server: function(server) {
    server.use(express.json());
    server.use(express.static(path.resolve(__dirname, '../client/build')));
  },
  generateToken: generateToken,
  authenticate: authenticate
};
