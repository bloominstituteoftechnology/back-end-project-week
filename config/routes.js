const { server } = require('../server');
const noteCRUD = require('../data/helperFunctions/noteCRUD');

module.exports = server => {
  server.get('/', index);
  server.get('/notes', getAllNotes);
  server.get('/notes/:id', getSpecificNote);
  server.post('/notes', createNote);
  server.put('/notes/:id', updateNote);
  server.delete('/notes/:id', deleteNote);

}

function index(req, res) {
  res.status(200).json({ hello: "world", project: "back-end-project" });
};

// GET | Display a list of notes.
async function getAllNotes(req, res) {
  try {
    const notes = await noteCRUD.readAll();
    res.status(200).json({notes});
  } catch (err) {
    res.status(500).send({err});
  }
};

// GET | View an existing note.
async function getSpecificNote(req, res) {
  const id = req.params.id;
  try {
    const note = await noteCRUD.read(id);
    res.status(200).json({note});
  } catch (err) {
    res.status(500).send({err});
  }
};

// POST | Create a note with a title and content.
async function createNote(req, res) {
  const { title, content } = req.body;
  const noteParams = { title, content };

  if (!title || !content || title === '' || content === '') {
    res.status(400).json({ error: "We're missing the title or content on this post." });
  }
  try {
    const newNote = await noteCRUD.create(noteParams);
    const note = await noteCRUD.read(newNote.id);
    res.status(201).json({note, message: "Successfully created new note."});
  } catch (err) {
    res.status(500).json(err);
  }
}

// PUT | (UPDATE) Edit an existing note.
async function updateNote(req, res) {
  const { title, content } = req.body;
  const noteParams = { title, content };
  const id = req.params.id;

  try {
    const newNote = await noteCRUD.update(id, noteParams);
    const getNote = await noteCRUD.read(id);
    res.status(200).json({getNote, message: "Successfully updated existing note."});
  } catch (err) {
    res.status(500).json(err);
  }
}

// DELETE | Delete an existing note.
async function deleteNote(req, res) {
  const id = req.params.id;

  try {
    const deleteNote = await noteCRUD.remove(id);
    const getNotes = await noteCRUD.readAll();
    res.status(200).json({getNotes, message: `Successfully deleted note ${id}.`});
  } catch (err) {
    res.status(500).json(err);
  }
}