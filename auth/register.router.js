const express = require('express');
const utils = require('./utils');

const Users = require('../models/Users.model');

const router = express.Router();

const { RouterFactory } = require('express-router-factory');

const RF = new RouterFactory(router, Users);

RF.POST('/', registerUser);

function registerUser(req, res, next) {
  // console.log(req.body);
  Users.create(req.body)
    .then(({ _id, name, username, password }) => {
      // console.log({ name, username, password });
      const jwt = utils.createToken({ _id, username });
      console.log(jwt);
      res.status(201).json({ name, username, jwt });
    })
    .catch(err => res.status(500).json({ err, what: 'the hell' }));
}

module.exports = router;
