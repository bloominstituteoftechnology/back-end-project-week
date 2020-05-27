const db      = require('../../data/helpers');
const jwt     = require('jsonwebtoken');
const chalk   = require('chalk');
const express = require('express');
const router  = express.Router();
const ROUTE   = '/api/users/create';

// Error messages.
const errors = [
  'Username and password are undefined',    // 0
  'Username must be at least 4 characters', // 1
  'Password must be at least 6 characters', // 2
  'Unable to add user to database',         // 3
];


// Create a user
router.post('/api/users/create', (req, res, next) => {

  console.info(chalk.yellow(`Post request recieved: ${ ROUTE }\n`));

  // Declare Variables
  const reqHasProps     = (req.body.hasOwnProperty('username') && req.body.hasOwnProperty('password'));
  const usernameIsValid = (reqHasProps && req.body.username.length >= 4);
  const passwordIsValid = (reqHasProps && req.body.password.length >= 6);
  const { username, password } = reqHasProps && req.body;

  console.info(chalk.yellow(`username: ${ username }\npassword: ${ password }\n`))

  if (reqHasProps === false)     next(new Error(errors[0]));
  if (usernameIsValid === false) next(new Error(errors[1]));
  if (passwordIsValid === false) next(new Error(errors[2]));

  db.createUser(username, password, (err, data) => {

    if (err) next({ message: errors[3], error: err });

    const { rows, id, username, password, hash } = data;

    if (rows[0] < 1) next(new Error(errors[3]));

    console.log(chalk.green(`User was created\n`));
    console.info(chalk.yellow(` id: ${ id }\nusername: ${ username }\npassword: ${ password }\nhash: ${ hash }\n`));
    res.status(201).json({ success: 'User was created' });

  });

});

// Error handler
router.use((err, req, res, next) => {

  switch(err.message) {
    case errors[0]:
    case errors[1]:
    case errors[2]:
      console.error(chalk.red(`${ err.message }`));
      res.status(406).json({ error: err.message})
      break;
    case errors[3]:
      console.log(chalk.red(`${ err.message }\n`));
      res.status(500).json({ error: err.message });
      break;
    default:
      break;
  }

});

module.exports = router;
