const Note = require('../models/note');
const User = require('../models/user');
// const { requireAuth, getTokenForUser } = require('../services/auth');
const { getTokenForUser } = require('../services/auth');

const createNote = (req, res) => {
  const { title, content } = req.body;
  const { authorId } = req.params;
  const newNote = new Note({ title, content });
  // console.log(newNote);
  newNote.save()
  .then(note => {
    // console.log(note);
    User
    .findOneAndUpdate({ _id: authorId }, { $push: { notes: note } }, function(err, updatedUser){
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

const updateNote = (req, res) => {
  const { authorId, noteId } = req.params;
  const noteUpdates = req.body;
  // console.log(noteUpdates);
  User.findById(authorId)
  .then(foundUser => {
    Note.findByIdAndUpdate(noteId, noteUpdates, (err, updatedNote) => {
      if (err) res.status(501).json(err);
      // console.log(foundUser);
      // console.log(updatedNote);
      res.status(200).json(updatedNote);
    })
  })
}

// try splice for deleting array elements in user.notes
const deleteNote = (req, res) => {
  const { authorId, noteId } = req.params;
  Note.findByIdAndRemove(noteId, (err, removedNote) => {
    if (err) res.status(501).json(err);
    res.status(200).json(removedNote);
    User.findById(authorId, (err, foundAuthor) => {
      if (err) res.status(501).send(err);
      // console.log(foundAuthor.notes);
      foundAuthor.notes = foundAuthor.notes.filter(foundAuthorNote => foundAuthorNote !== noteId);
      console.log(foundAuthor.notes);
      res.status(200).json(foundAuthor);
    })
  })
}

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote
};
