const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost/client-auth');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(bodyParser.json());

const jwt = exjwt({ secret: 'nothing here silly' });

let token;

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Invalid email and/or password' });
      return;
    }
    if (email === null) {
      res.status(422).json({ error: 'No user with that email exist' });
      return;
    }
    user.checkPassword(password, (noMatch, hashMatch) => {
      if (noMatch !== null) {
        res.status(422).json({ error: 'password invalid' });
        return;
      }
      if (hasMatch) {
        token = jwt.sign(
          { id: user._id, email: user.email },
          { expiresIn: 6000 }
        );
        res.json({ success: true, error: null, token });
      }
    });
  });
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  newUser.save((err, user) => {
    if (err) return res.send(err);
    res.json({ success: 'User saved', user });
  });
});

app.post('/notes/create', (req, res) => {
  if (!token) {
    res
      .status(404)
      .json({ message: 'You must be logged in to create a note. ' });
  }
  const { title, body } = req.body;
  const newNote = new Note({ title: title, body: body });
  newNote.save((err, note) => {
    if (err) return res.send(err);
    res.json({
      success: 'note saved',
      note,
    });
  });
});
