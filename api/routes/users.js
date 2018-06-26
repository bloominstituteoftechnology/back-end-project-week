const router = require('express').Router();
const User = require('../models/User');
const { sendErrorMessage } = require('../utils/sendErrorMessage');

router
  .post('/', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    User.create({ firstName, lastName, email, password })
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        sendErrorMessage(err, res, 'The user could not be created.');
      });
  })
  .get('/', (req, res) => {
    User.find({})
      .select({
        _id: 0,
        firstName: 1,
        lastName: 1,
        email: 1
      })
      .then(users => {
        res.status(200).json(users);
      })
      .catch(err => {
        res.status(500).json({ error: 'The list of users could not be retrieved.' });
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id)
      .select({
        _id: 0,
        firstName: 1,
        lastName: 1,
        email: 1
      })
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ error: `The user with id ${id} does not exist.` });
        }
      })
      .catch(err => {
        sendErrorMessage(err, res, `The user with id ${id} could not be retrieved.`);
      });
  });

module.exports = {
  usersRouter: router
};
