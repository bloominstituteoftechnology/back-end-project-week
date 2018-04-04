const Note = require('../models/noteModel');

const createNote = async function(req, res) {
  const { author, title, body } = req.body;
  const note = new Note({ author, title, body });
  try {
    const savedNote = await note.save();
    res.json({ status: 'success', savedNote });
  }
  catch (err) {
    console.log(err);
    res.status(422).json({ status: err });
  };
};

const listNotes = async function(req, res) {
  const { uuid } = req.headers;
  if (!uuid) return res.status(422).json({ error: 'No uuid in headers!' });
  try {
    const allNotes = await Note.find({
      author: uuid,
    });
    res.json({ status: 'success', allNotes });
  } catch(err) {
    console.log(err);
    res.status(500).json({ status: err });
  };
};

const editNote = async function(req, res) {
  const { uuid } = req.headers;
  const { _id, title, body } = req.body;

  if (!uuid) return res.status(422).json({ error: 'No uuid in headers!' });
  if (!_id || !title || !body) return res.status(422).json({ error: 'Needs _id, title, and body.'});
  try {
    const updatedNote = {
      title,
      body,
    };
    const foundNote = await Note.findByIdAndUpdate(_id, updatedNote);
    if (!foundNote) return res.status(422).json({ error: 'No note with that ID found' });
    res.json(updatedNote);
  } catch(err) {
    console.log(err);
    res.status(500).json({ status: err });
  };
};

module.exports = { 
  createNote,
  listNotes,
  editNote,
};
