const express = require('express');
const utils = require('./utils');

const Users = require('../models/Users.model');

const { RouterFactory } = require('express-router-factory');

const router = express.Router();

const RF = new RouterFactory(router, Users);

RF.POST('/', registerUser);

function registerUser(req, res, next) {
  Users.create(req.body)
    .then(({ name, username, password }) => {
      const jwt = utils.createToken({ name, username });
      res.status(201).json({ username, race, jwt });
    })
    .catch(err => res.status(500).json(err));
}

module.exports = router;
