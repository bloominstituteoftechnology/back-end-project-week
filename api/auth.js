const express = require('express'),
  router = express.Router(),
  db = require('../data/helpers/userModel.js'),
  bcrypt = require('bcrypt'),
  { generateJwt } = require('../middleware/auth');

router
  .post('/register', generateJwt, async function (req, res) {
    const { user_name, email, password, name } = req.body;
    const saltRounds = 10;

    if (!user_name || !email || !password || !name) {
      console.log('Missing information');
      return res.status(400).json({ error: "Missing information" });
    }

    console.log('Registering');

    req.body.password = await bcrypt.hash(password, saltRounds).then(hash => hash);
    db.insert(req.body).then(users => {
      res.cookie('token', req.token, { httpOnly: true });
      res.status(201).json({ users });
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: "There was an error while saving the user to the database",
        info: { err }
      });
    });
  })
  .post('/login', generateJwt, function (req, res) {
    console.log("Attempting login", req.body);

    db.login(req.body.user_name)
      .then(user => {
        if (!user) {
          console.log('User not found');
          return res.status(403).json({ error: "User not found" });
        }

        console.log(user);

        return bcrypt.compare(req.body.password, user.password).then(eq => {
          if (eq) {
            console.log('Passwords match');
            res.cookie('token', req.token, { httpOnly: true });
            res.json({ user });
          } else {
            console.log('Passwords do not match');
            throw 'Passwords do not match';
          }
        });

      })
      .catch(err => res.status(500).json({ error: "There was an issue logging in.", info: err }));
  })
  .get('/logout', (req, res) => {
    console.log('Attempting logout');

    if (req.cookies.token) {
      res.clearCookie('token');
      console.log('Log out success');
      res.json({ error: false });
    } else {
      console.log('Not logged in');
      res.send('Not logged in')
    }
  });

module.exports = router;