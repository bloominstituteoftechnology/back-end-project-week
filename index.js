const express = require('express');
const db = require('./data/db.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('API up and running!')
})

server.get('/api/notes', (req, res) =>  {
  db('notes')
  .then(notes => {
    res.status(200).json(notes);
  })
  .catch(err => {
    res.status(500).json({ error: "The notes could not be retrieved." })
  })
})

const port = 8000;
server.listen(port, function() {
    console.log(`\n===Web API listening on http://localhost:${port} ===\n`);
});
