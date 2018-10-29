const express = require('express');
const db = require('./data/db');
const server = express();
server.use(express.json());

server.get('/notes', async (req, res) => {
  try {
    const notes = await db.select().from('notes');
    res.status(200).json(notes);
  } catch (err) {
    console.log('/notes GET error:', err);
    res
      .status(500)
      .send({ error: 'Unable to retrieve notes. Please try again later.' });
  }
});

server.post('/notes', async (req, res) => {
  let note = req.body;
  if (!'title' in note) {
    res.status(400).send({ error: 'Your note must have a title.' });
  } else if (note.title.length > 40) {
    res
      .status(400)
      .send({ error: 'Titles must be shorter than 40 characters.' });
  }
  try {
    await db.insert(note).into('notes');
    res.status(201).json({ msg: 'Your note was successfully saved.' });
  } catch (err) {
    console.log('/notes POST error:', err);
    res
      .status(500)
      .send({ error: 'Your note could not be saved. Please try again later.' });
  }
});

const port = 6000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
