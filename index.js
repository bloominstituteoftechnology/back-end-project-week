const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const db = require('./db/helpers/notesHelper');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://<YOUR_AUTH0_DOMAIN>/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'RjCcPnKzUiwDudwzEfSNlOhacIs3IInS',
    issuer: `https://dasma.auth0.com/`,
    algorithms: ['RS256']
  });
  


server.get('/', (req, res) => {
    res.send('API running....')
});

// ########## GET ALL NOTES ################
server.get('/notes', (req, res) => {
    db.getNotes()
      .then(notes => res.status(200).json(notes))
      .catch(err => res.status(500).json(err))
  });

// ########### GET NOTE BY ID ################
server.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    db.getNote(id)
    .then(notes => notes.find(note => note.id === +id))
    .then(notes => {
        if(notes) {
      res.status(200).json(notes);
        } else {
            res.status(404).json({Message: 'The note with specified id does not exist!'});
        }
    })
    .catch(error => {
      res.status(500).json(error);
    })
});

// ########## POSTING NEW NOTE ###########
server.post('/notes', checkJwt, (req, res) => {
    const { title, content } = req.body;
    const note = {
        title,
        content,
        author: req.user.name
    };
    if (!title || !content) {
        res.status(400).json('Message: title and content are required fields!')
    }

    db.addNote(note)
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

// ########### UPDATING NOTE ###########
server.put('/notes/:id', checkJwt, (req, res) => {
    const {title, content} = req.body;
    const {id} = req.params;
    const updatedNote = {
        title,
        content,
        author: req.user.name
    };
    if (!title || !content) {
        res.status(400).json('Message: In order to update note, title and content are required fields!')
    }
    db.updateNote(id, updatedNote)
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

// ########### DELETE NOTE ###############
server.delete('/notes/:id', checkJwt, (req, res) => {
    const {id} = req.params;
    db.deleteNote(id)
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});

server.listen(9000);