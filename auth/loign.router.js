const express = require('express');
const utils = require('./utils');
const Users = require('../models/Users.model');
const { RouterFactory } = require('express-router-factory');

const router = express.Router();

const RF = new RouterFactory(router, Users);

RF.POST('/', loginUser);

function loginUser(req, res, next) {
  const { username, password } = req.body;
  Users.findOne({ username }, { name: 1, password: 1, _id: 0 })
    .then(user => {
      const { name } = user;
      console.log(name);
      user
        .validatePassword(password)
        .then(validPassword => {
          if (!validPassword)
            return res
              .status(422)
              .json({ 'Bad Credentials': 'Please, check your credentials, there are some wrong data.' });

          const jwt = utils.createToken({ name, username });
          res.status(200).json({ username, jwt });
        })
        .catch(e => {
          console.log('error', e);
          res.status(404).json({ e });
        });
    })
    .catch(e => {
      console.log('error', e);
      res.status(500).json({ e });
    });
}

module.exports = router;
