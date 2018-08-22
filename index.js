const db = require('./db/dbConfig');

const express = require('express');
const server = express();

server.use(express.json());

server.get('/api/lnotes', (req, res) => {
  db('lnotes')
  .then(lnotes => {
    res.status(200).json({lnotes});
  })
  .catch(error => {
    res.status(500).json({error});
  });
})

server.post('/api/lnotes', (req, res) => {
  const newnote = req.body;
  // if (!newnote.title || !newnote.content) {
  //   res.status(400).json(`There was an error with unfilled blank or field`);
  // }
  db('lnotes')
  .insert(newnote)
  .then(response => {
    res.status(201).json(`A new note has been successfully added!`);
  })
  .catch(error => {
    res.status(500).json(`The notes API had an error while adding a note.`);
  });
});



const port = 8000;

server.listen(port, () => {
  console.log(`API server running on Port: ${port}`);
})
