const Note = require('../models/note');
const User = require('../models/user');
// const { requireAuth, getTokenForUser } = require('../services/auth');
const { getTokenForUser } = require('../services/auth');

const createNote = (req, res) => {
  const { id, title, content } = req.body;
  const newNote = new Note({ title, content });
  // console.log(newNote);
  newNote.save()
  .then(note => {
    // console.log(note);
    User
    .findOneAndUpdate({ _id: id }, { $push: { notes: note } }, function(err, updatedUser){
      if (err){
              console.log(err);
      } else {
        // console.log("Successfully updated");
        res.status(201).json(updatedUser);
      }
    });
  });
}

const getNotes = (req, res) => {
  // This controller will not work until a user has sent up a valid JWT
  // check out what's going on in services/index.js in the `validate` token function
  const { id } = req.params;
  // console.log(id);
  if (!id) return res.status(422).json({ error: 'No Author ID was found in the request!' });
  User
  .findById({ _id: id }, (err, foundUser) => res.json(foundUser))
  .populate({ path: 'notes'})
  .catch(err => {
    // console.log(err);
    res.status(500).json({ error: "The notes could not be retrieved." });
  });
};

module.exports = {
  createNote,
  getNotes,
};
