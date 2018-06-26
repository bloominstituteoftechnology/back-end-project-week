const router = require('express').Router();
const User = require('../models/User');
const { sendErrorMessage } = require('../utils/sendErrorMessage');

router.post('/', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  User.create({ firstName, lastName, email, password })
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      sendErrorMessage(err, res, 'The user could not be created.');
    });
});
//   .get()
//   .get()
//   .update()
//   .delete();

module.exports = {
  usersRouter: router
};
