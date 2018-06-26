const router = require('express').Router();
const User = require('../models/User');
const { sendErrorMessage } = require('../utils/sendErrorMessage');

router
  .post('/', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    User.create({ firstName, lastName, email, password })
      .then(user => {
        const { firstName, lastName, email } = user;
        res.status(201).json({ firstName, lastName, email });
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
        res
          .status(500)
          .json({ error: 'The list of users could not be retrieved.' });
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
          res
            .status(404)
            .json({ error: `The user with id ${id} does not exist.` });
        }
      })
      .catch(err => {
        sendErrorMessage(
          err,
          res,
          `The user with id ${id} could not be retrieved.`
        );
      });
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;
    const options = {
      new: true,
      runValidators: true
    };

    User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, password },
      options
    )
      .select({
        _id: 0,
        firstName: 1,
        lastName: 1,
        email: 1
      })
      .then(updatedUser => {
        if (updatedUser) {
          res.status(200).json(updatedUser);
        } else {
          res
            .status(404)
            .json({ error: `The user with id ${id} does not exist.` });
        }
      })
      .catch(err => {
        sendErrorMessage(
          err,
          res,
          `The user with id ${id} could not be modified.`
        );
      });
  });

module.exports = {
  usersRouter: router
};
