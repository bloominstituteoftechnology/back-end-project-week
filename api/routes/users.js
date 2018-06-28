const router = require('express').Router();
const User = require('../models/User');
const { sendErr, sendRes } = require('../utils/apiResponses');
const { generateToken } = require('../../server/middleware');

router
  .post('/', (req, res) => {
    const newUser = req.body;

    User.create(newUser)
      .then(({ _id, firstName, lastName, email }) => {
        sendRes(res, '201', { _id, firstName, lastName, email });
      })
      .catch(err => {
        sendErr(res, err, 'The user could not be created.');
      });
  })
  .post('/register', (req, res) => {
    const newUser = req.body;

    User.create(newUser)
      .then(({ _id, firstName, lastName, email }) => {
        const fullName = `${firstName} ${lastName}`;
        const token = generateToken({
          userid: _id,
          name: fullName,
          email: email
        });
        sendRes(res, '201', { name: fullName, token });
      })
      .catch(err => {
        sendErr(res, err, 'The user could not be created.');
      });
  })
  .post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      sendErr(res, 'ValidationError', 'Email and password required.');
      return;
    }

    User.findOne({ email })
      .then(user => {
        if (user) {
          user.isValidPassword(password, (err, match) => {
            if (err || !match) return sendErr(res, '401', 'Invalid credentials');

            const fullName = `${user.firstName} ${user.lastName}`;
            const token = generateToken({
              userid: user._id,
              name: fullName,
              email: user.email
            });

            sendRes(res, '200', { name: fullName, token });
          });
        } else {
          sendErr(res, '401', 'Invalid credentials');
        }
      })
      .catch(err => {
        sendErr(res, err, err.message);
      });
  })
  .get('/', (req, res) => {
    User.find()
      .select({ firstName: 1, lastName: 1, email: 1 })
      .then(users => {
        sendRes(res, '200', users);
      })
      .catch(err => {
        sendErr(res, err, 'The list of users could not be created.');
      });
  })
  .get('/:id', (req, res) => {
    const { id } = req.params;

    User.findById(id)
      .select({ firstName: 1, lastName: 1, email: 1 })
      .then(user => {
        sendRes(res, '200', user);
      })
      .catch(err => {
        sendErr(res, err, `The user with id ${id} could not be retrieved.`);
      });
  })
  .put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;
    const options = {
      new: true,
      runValidators: true
    };

    User.findByIdAndUpdate(id, updatedUser, options)
      .then(updatedUser => {
        const { _id, firstName, lastName, email } = updatedUser;
        sendRes(
          res,
          '200',
          updatedUser ? { _id, firstName, lastName, email } : null
        );
      })
      .catch(err => {
        sendErr(res, err, `The user with id ${id} could not be modified.`);
      });
  })
  .delete('/:id', (req, res) => {
    const { id } = req.params;

    User.findByIdAndRemove(id)
      .then(deletedUser => {
        sendRes(res, '200', deletedUser ? { _id: deletedUser._id } : null);
      })
      .catch(err => {
        sendErr(res, err, `The user with id ${id} could not be removed.`);
      });
  });

module.exports = {
  usersRouter: router
};
