const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('./db/helpers/Helper');
const dbUsers = require('./db/dbConfig');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

const secret = 'secret';

// ########## Generating token ###########
function generateToken(user){
    const payload = {
        username: user.username,
        department: user.department
    };

    const options = {
        expiresIn: '1h',
        jwtid: '12345'
    }
    return jwt.sign(payload, secret, options);
}

// ####### Protected middleware ##########
function protected(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                return res
                    .status(400)
                    .json({ Message: ' Invalid token' })
            } else {
                req.user = { username: decodedToken.username }
            next()
            }
        })
    } else {
        return res.status(400).json({ Message: 'No token found' })
    }
}


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
server.post('/notes', (req, res) => {
    const { title, content } = req.body;
    const note = {
        title,
        content
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
server.put('/notes/:id', (req, res) => {
    const {title, content} = req.body;
    const {id} = req.params;
    const updatedNote = {
        title,
        content
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
server.delete('/notes/:id', (req, res) => {
    const {id} = req.params;
    db.deleteNote(id)
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(error => {
            res.status(500).json(error)
        })
});


// ###### Registering newUser ############
server.post('/register', (req, res) => {
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 14);
    newUser.password = hash;

    dbUsers('users')
    .insert(newUser)
    .then(ids => {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(newUser => {
          const token = generateToken(newUser);
          res.status(201).json(token);
        });
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
})

// ########### Login ##############
server.post('/login', (req, res) => {
    const creds = req.body;

    dbUsers('users')
        .where({username: creds.username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json(token)
            } 
            else {
                return res.status(400).json({Message: 'Wrong credentials'})
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

server.listen(9000);