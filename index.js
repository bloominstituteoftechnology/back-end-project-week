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

const port = 6000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
