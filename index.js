const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors')

const db = require('./data/db.js');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

///endpoints go here

server.get('/notes', (req, res) => {
    db('notes').then(note => {
      res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
    
  });

  server.post('/notes', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content )
    res.status(400).json({ errorMessage: "Required fields"});
    db.insert({ title, content }) 
    .into("notes")
    .then(note => res.status(201).json({title, content})) 
    .catch(err => res.status(400).json({error: "Error posting"}))
  })

const port = 3300;
server.listen(port, function() {
 console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
