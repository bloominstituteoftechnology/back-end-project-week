const User = require('../models');
const { generateToken } = require('../services/auth');

let notes = [
  {
    id: 0,
    title: 'Your First Note',
    body: 'Edit to get started',
  },
];

let id = notes.length;

const registerUser = (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save((err, user) => {
    if (err) return res.send(err);
    res.json({ message: 'Success Registered User Saved', user });
  });
};

const getNotes = (req, res) => {
  res.send(notes);
};

const createNote = (req, res) => {
  const { title, body } = req.body;
  const myNote = { id, title, body };
  notes.push(myNote);
  res.json(notes);
  id++;
};

const deleteNote = (req, res) => {
  const key = req.body.id;
  const newNotes = notes.filter(note => {
    return key !== note.id;
  });
  notes = newNotes;
  res.json(notes);
};

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Check your email and password' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'User not found' });
      return;
    }
    user.checkPassword(password, (incorrect, correct) => {
      if (incorrect !== null) {
        res.status(422).json({ error: 'Incorrect password' });
        return;
      }
      if (correct) {
        const token = generateToken({ email: user.email });
        res.json({ token });
      }
    });
  });
};

module.exports = { registerUser, getNotes, login, createNote, deleteNote };
