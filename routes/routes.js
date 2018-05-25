const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const Note = require('../models/noteModel');

const secret = 'ikea monkey';

const authenticate = (req, res, next) => {
  const token = req.get('authorization');
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return res.status(422).json(err);
      req.decoded = decoded;
      next();
    });
  } else {
    return res.status(403).json({
      error: 'No valid token provided.'
    });
  }
};

const createUser = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(422)
      .json({ error: 'A valid username and password is required' });
  } else {
    const newUser = new User({ username, password });
    newUser
      .save()
      .then(response => {
        res.status(201).json(response);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
};

const login = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username: username.toLowerCase() }, (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Invalid Username/Password' });
      return;
    }
    if (user === null) {
      res.status(422).json({ error: 'That User Does Not Exist' });
      return;
    }
    user.verifyPassword(password, (notMatch, match) => {
      if (notMatch !== null) {
        res.status(422).json({ error: "passwords don't match" });
        return;
      }
      if (Match) {
        const payload = { username: user.username };
        const token = jwt.sign(payload, secret);
        res.json({ token });
      }
    });
  });
};

const getNotes = (req, res) => {
  const { user } = req.body;
  Note.find({ user })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: 'Error getting notes.' }));
};

const createNote = (req, res) => {
  const { title, text, users } = req.body;
  if (title && text && users) {
    const newNote = new Note({ title, text, users });
    newNote
      .save()
      .then(note => res.send(note))
      .catch(err => {
        res.status(422).send('Error saving the note.');
      });
  } else {
    res.status(422).send('Enter a valid title and content for the note');
  }
};

const editNote = (req, res) => {
  const { title, text, id } = req.body;
  if (title && text && id) {
    Note.findOneAndUpdate({ _id: id }, { title, text }, { new: true })
      .then(note => res.send(note))
      .catch(err => {
        res.status(422).send('Error editing the note');
      });
  } else {
    res.status(422).send('Enter a valid title, text and/or id for the note');
  }
};

const deleteNote = (req, res) => {
  const { id } = req.params;
  if (id) {
    Note.findOneAndRemove({ _id: id })
      .then(note => res.send(note))
      .catch(err => {
        res.status(422).send('Error deleting the note');
      });
  } else {
    res.status(422).send('Provide a vaild id to delete a note');
  }
};

module.exports = server => {
  server.route('/register').post(createUser);
  server.route('/login').post(login);
  server.route('/home').post(authenticate, getNotes);
  server.route('/create').post(authenticate, createNote);
  server.route('/edit/:id').put(authenticate, editNote);
  server.route('/note/:id').delete(authenticate, deleteNote);
};
