const router = require('express').Router();
const User = require('../models/User');
const { sendErrorMessage } = require('../utils/sendErrorMessage');

router
  .post('/', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    User.create({ firstName, lastName, email, password })
      .then(user => {
        const { _id, firstName, lastName, email } = user;
        res.status(201).json({ _id, firstName, lastName, email });
      })
      .catch(err => {
        sendErrorMessage(err, res, 'The user could not be created.');
      });
  })
  .get('/', (req, res) => {
    User.find({})
      .select({
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
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;

    User.findByIdAndRemove(id)
      .then(deletedUser => {
        if (deletedUser) {
          const { _id } = deletedUser;
          res.status(200).json({ _id });
        } else {
          res
            .status(400)
            .json({ error: `The user with id ${id} does not exist.` });
        }
      })
      .catch(err => {
        sendErrorMessage(
          err,
          res,
          `The user with id ${id} could not be removed.`
        );
      });
  });

module.exports = {
  usersRouter: router
};
