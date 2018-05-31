const Note = require('../models/notesModel');
const User = require('../models/usersModel');


const getNotes = (req, res) => {
  const { user } = req.body;
  Note
    .find({ user })
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: 'Error getting notes.' }));
};

const getNotesById = (req, res) => {
  const { user } = req.body;
  Note
    .findById({ user })
    .then(note => res.json(note))
    .catch(err => res.status(500).json({ error: 'Error getting this note by ID.' }));
};

const createNote = (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    const newNote = new Note({ title, content });
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
  const { title, content, id } = req.body;
  if (title && content && id) {
    Note.findOneAndUpdate({ _id: id }, { title, content }, { new: true })
      .then(note => res.send(note))
      .catch(err => {
        res.status(422).send('Error editing the note');
      });
    } else {
      res.status(422).send('Enter a valid title, content and/or id for the note');
    }
};

const deleteNote = (req, res) => {
  const { id } = req.params;
  if (id) {
    Note.findOneAndRemove({ _id: id })
      .then(note => res.send(note))
      .catch(err => {
        res.status(422).send('Error deleting note');
      });
    } else {
    res.status(422).send('Provide a vaild id to delete note');
    }
};

module.exports = server => {
  server.route('/home').post(authenticate, getNotes);
  server.route('/:id').post(authenticate, getNotesById);
  server.route('/create').post(authenticate, createNote);
  server.route('/edit/:id').put(authenticate, editNote);
  server.route('/note/:id').delete(authenticate, deleteNote);
};