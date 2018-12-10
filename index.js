require('dotenv').config();
const express = require('express');
const helmet = require('helmet')
const knex = require('knex');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.all('', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //Auth Each API Request created by user.
    next();
    });

server.get('/', (req, res) => {
    res.send('Besh!');
});



server.get('/notes', (req, res) => {
    db('notes_table_two') // migrate
    .then(notes => {
        res.status(200).json(notes);
        console.log(notes);
    })
    .catch(err => {
        res.status(500).json({ err: 'Sorry, the list of notes could not be retrieved.', err });
    })
});

server.get('/notes/:id', protected, (req, res) => {
    db('notes_table_two')
    .where({ id: req.params.id })
    .first()
    .then(note => {
        if (note) {
            res.status(200).json(note);
        } else {
            res.status(404).json({ message: 'Sorry, the note with the specified ID does not exist.' });
        }
    })
    .catch(err => 
        res.status(500).json({ err: 'Sorry, the note with the specified ID could not be retrieved.', err }));
    });

server.post('/notes/addnote', (req, res) => {
    const note = req.body;
    db.insert(note)
    .into('notes_table_two')
    .then(id => {
        res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json({ error: 'This not could not be added.', err });
    })
});


server.put('/notes/edit/:id', (req, res) => {
    const { id } = req.params;
    const newNote = req.body;
    db('notes_table_two')
    .where({ id })
    .update(newNote)
    .then(note => {
        if (!note || note < 1) {
            res.status(404).json({ message: 'The note with the specified ID does not exist.' });
        } else {
            res.status(200).json(note);
        }
    })
      .catch(err => {
        res.status(500).json({ error: 'This note could not be modified.', err });
      })
  });

server.delete('/notes/delete/:id', (req, res) => {
    db('notes_table_two')
    .where({ id: req.params.id })
    .del()
    .then(note => {
      if (note) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "The note associated with this ID does not exist." });
      }
    })
    .catch(err => 
        res.status(500).json({ err: 'This note could not be removed.'}));
});


// USERS
server.post('/register', (req,res) => {
    const credentials = req.body;
    // hash!
    const hash = bcrypt.hashSync(credentials.password, 2)
    credentials.password = hash;
    db('users')
    .insert(credentials)
    .then(ids => {
        const id = ids[0];
        const token = generateToken({ username: credentials.username });
        console.log(credentials);
        res.status(201).json({newUserId: id, token})
    })
});

const jwtSecret = process.env.JWT_SECRET || 'Add secret to .env with this key';

function generateToken(user) {
    const jwtPayload = {
        ...user,
        hello: `${user}`,
        subject: user.id,
    }
    const jwtOptions = {
        expiresIn: '1hr'
    }
    return jwt.sign(jwtPayload, jwtSecret, jwtOptions)
}

server.post('/login', (req, res) => {
    const credentials = req.body;
    db('users')
    .where({ username: credentials.username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
            const token = generateToken(user)
            res.status(201).json({ Welcome: user.username, token});
        } else {
            res.status(401).json({ message: 'You shall not pass!'})
        }
    })
})

function protected(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token, you shall not pass'})
            } else {
                req.decodedToken = decodedToken;
                console.log('\n***decoded token info **\n', req.decodedToken);
                next();
            }
        })
    } else {
        res.status(401).json({ message: 'no token provided'})
    }
}

server.get('/users', (req, res) => {
    db('users')
      .select('id', 'username', 'password')
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  });
  

const port = process.env.PORT|| 4443;
server.listen(port, () => console.log(`==== Party at port ${port} ====`));