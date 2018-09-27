require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const knex = require ('knex');

const db = require('./dbConfig.js');


const server = express();

server.use(express.json());
server.use(cors());

const secret = 'apples and bananas';

function generateToken(user) {
    const payload = {
        username: user.username
       
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345',
    };
    return jwt.sign(payload,secret,options)
}

function protected(req, res, next) {
    const token = req.headers.authorization;
    if(token) {
 
    jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                console.log('jwt.verify',err)
                res.status(401).send('invalid token')
                }
                else {
                 next()  
                }
          
        })
    }
   
        
    
}

// special endpoints

server.post('/api/register', (req,res) => {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password,10);
    creds.password = hash;
    db('users')
    .insert(creds)
    .then(ids => {
     const id = ids[0];

     db('users')
     .where({ id })
     .first()
     .then(user => {
         console.log('user',user);
         const token = generateToken(user);
         console.log('token', token);
         res.status(201).json({id: user.id, token});
     })
     .catch(err => {
        console.log('/api/register POST ERROR:', err);
        res.status(500).send(err);
     });
   })
   .catch(err => {
    console.log('/api/register POST ERROR:', err);
    res.status(500).send(err);
 })
});

server.post('/api/login', (req,res) => {
    const creds = req.body;

    db('users')
    .where({ username:creds.username})
    .first()
    .then(user => {
     if(user && bcrypt.compareSync(creds.password, user.password)) {
         const token = generateToken(user);

         res.status(200).json({ token });
     } else {
         res.status(401).json({ message: 'NOPE!'});
     }
    })
    .catch(err => {
        console.log('/api/login POST ERROR:', err);
        res.status(500).send(err);
     })
});

server.get('/api/users', protected, (req, res) => {
    db('users')
    .select('id','username','password')
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        console.log('/api/users GET ERROR:', err);
        res.status(500).send(err);
     })
});




// endpoints

server.get('/', (req, res) => {
    res.send('backend project week');
});

server.get('/api/notes', (req, res) => {
    db('notes')
    .then(notes => {
      res.status(200).json(notes)
    })
    .catch(err => {
        console.log('/api/notes GET ERROR:', err);
        res.status(500).send(err);
    })
});

server.get('/api/notes/:id', (req, res) => {
    const {id} = req.params;
    db('notes').where({ id: id })
    .then(note => {
        if (note.length === 0) {
        res.status(404).json({ message: "The note with the specified ID does not exist." });
        } else 
        res.status(200).json(note);
    })
    .catch(err => res.status(500).json(err));
});


server.post('/api/notes', (req, res) => {
    const note = req.body;
    if (!note.title || !note.content) {
        res.status(400).json({ error: "Please provide a title and content ." })
    } else
        db.insert(note)
        .into('notes')
        .then(ids => {
        res.status(201).json(ids);
        })
        .catch(err => res.status(500).json({ error: "error saving the note." }))
});

server.delete('/api/notes/:id', (req, res) => {
    const {id} = req.params;
    db('notes').where({ id: id }).del()
    .then(count => {
        if (count) {
        res.status(204).end();
        } else {
        res.status(404).json({ message: "The note with the specified ID does not exist." });
        }
    })
    .catch(err => res.status(500).json(err));
});


server.put('/api/notes/:id', (req, res) => {
    const {id} = req.params;
    const note = req.body;
    if (!note.title || !note.content) {
        res.status(400).json({ error: "Please provide a title and content for the note." })
    } else
        db('notes').where({ id: id }).update(note)
        .then(count => {
        if (count) {
            res.status(200).json({ message: "The note has been updated." });
        } else {
            res.status(404).json({ message: "The note with the specified ID does not exist." });
        }
        })
        .catch(err => res.status(500).json(err));
});


const port = process.env.PORT || 2200;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});