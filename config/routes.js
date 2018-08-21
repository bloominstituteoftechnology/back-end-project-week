const { server } = require('../server');
const noteCRUD = require('../data/helperFunctions/noteCRUD');

module.exports = server => {
  server.get('/', index);
  server.get('/notes', getAllNotes);
  // server.get('/notes/:id', getSpecificNote);
}

function index(req, res) {
  res.status(200).json({ hello: "world", project: "back-end-project" });
};

// GET | Return stored notes
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


// POST | Create a note with a title and content.


// UPDATE | Edit an existing note.


// DELETE | Delete an existing note.


// Modify your front-end so that it uses your newly created Web API.
