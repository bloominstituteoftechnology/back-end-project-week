const Note = require('../models/note');
// const { requireAuth, getTokenForUser } = require('../services/auth');

const createNote = (req, res) => {
  const { title, content } = req.body;
  const user = new Note({ title, content });
  user.save((err, note) => {
    if (err) return res.send(err);
    res.json({
      success: 'Note saved',
      note
    });
  });
};

const getNotes = (req, res) => {
  // This controller will not work until a user has sent up a valid JWT
  // check out what's going on in services/index.js in the `validate` token function
  User.find({}, (err, notes) => {
    if (err) return res.send(err);
    res.send(notes);
  });
};

// const login = (req, res) => {
//   const { username, password } = req.body;
//   User.findOne({ username }, (err, user) => {
//     if (err) {
//       res.status(500).json({ error: 'Invalid Username/Password' });
//       return;
//     }
//     if (user === null) {
//       res.status(422).json({ error: 'No user with that username in our DB' });
//       return;
//     }
//     user.checkPassword(password, (nonMatch, hashMatch) => {
//       // This is an example of using our User.method from our model.
//       if (nonMatch !== null) {
//         res.status(422).json({ error: 'passwords dont match' });
//         return;
//       }
//       if (hashMatch) {
//         const token = getTokenForUser({ username: user.username });
//         res.json({ token });
//       }
//     });
//   });
// };

module.exports = {
  createNote,
  getNotes,
};
