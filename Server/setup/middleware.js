const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

//auth0 reqs
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

//auth0 code
var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://saxon.auth0.com/.well-known/jwks.json'
  }),
  audience: 'http://lamba-notes.com',
  issuer: 'https://saxon.auth0.com/',
  algorithms: ['RS256']
});

module.exports = function(server) {
  server.use(cors());
  server.use(helmet());
  server.use(morgan('dev'));
  server.use(jwtCheck);
  server.use(express.json());
};
