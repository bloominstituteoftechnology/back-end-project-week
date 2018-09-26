const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const knex = require('knex');

const server = express();
const port = 8000;

const secret = 'the best secret ever'

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

server.use(express.json());
server.use(cors());
server.use(helmet());


// Middleware
function generateToken(user) {
  const payload = {
    username: user.username,
    userId: user.userId
  };
  const options = {
    expiresIn: '7d',
    jwtid: '6145112653564465145145'
  };
  return jwt.sign(payload, secret, options);
}


function protected(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid Token' });
      } else {
        req.user = { username: decodedToken.username, id: decodedToken.userId };
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No Token Provided' });
  }
}



// Routes
server.get('/', (req, res) => {
  res.send('API Running...');
});


server.post('/register', (req, res) => {
  !req.body.username || !req.body.password ?
  res.status(400).json({message: 'You need a username AND password'})
  :
  null
  const creds = req.body;
  const hash = bcrypt.hashSync(creds.password, 11);
  creds.password = hash;
  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];
      db('users')
      .where({ userId: id })
      .first()
      .then(user => {
          const token = generateToken(user);
          res.status(201).json({ id: user.userId, username: user.username, token });
        })
        .catch(err => res.status(500).json({message: 'Unable to generate token'}));
    })
    .catch(err => res.status(500).json({message: 'Unable to insert credentials'}));
});


server.post('/login', (req, res) => {
  const creds = req.body;
  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ token, username: user.username });
      } else {
        res.status(401).json({ message: 'Invalid Token' });
      }
    })
    .catch(err => res.status(500).json({message: 'Unable to retrieve user'}));
});


server.get('/protected/notes', protected, (req, res) => {
  const { username } = req.user;
  db('users')
    .select('noteId as id', 'note_title as title', 'note_content as description')
    .join('notes', 'users.userId', 'notes.userId')
    .where({username})
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => res.send(err));
});


server.post('/protected/notes', protected, (req, res) => {
  const { id } = req.user;
  const content = {
    note_title: req.body.title,
    note_content: req.body.content,
    userId: id
  }
  db.insert(content).into('notes')
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => res.send(err));
});


server.put('/protected/notes/:id', protected, (req, res) => {
  const id = parseInt(req.params.id, 10);
  const content = {
    note_title: req.body.title,
    note_content: req.body.content,
  }
  db('notes').where({noteId: id}).update(content)
    .then(count => {
      res.status(200).json(count)
    })
    .catch(err => res.send(err));
});


server.delete('/protected/notes/:id', protected, (req, res) => {
  const id = parseInt(req.params.id, 10);
  db('notes').where({noteId: id}).del()
    .then(count => {
      res.status(200).json(count)
    })
    .catch(err => res.send(err));
});



/*
WHERE I AM ATTEMPTING DOUBLE JOIN

server.get('/protected/notes', protected, (req, res) => {
  const { username } = req.user;
    db('users')
    .select('noteId as id', 'note_title as title', 'note_content as description')
    .join('notes', 'users.userId', 'notes.userId')
    .join('tags', 'notes.noteId', 'tags.noteId')
    .where({username})
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => res.send(err));
});

SELECT c.id, c.firstname, c.lastname, GROUP_CONCAT(p.number) AS numbers
FROM contacts c
LEFT JOIN phone_numbers p
  ON c.id = p.contact_id
GROUP BY c.id, c.firstname, c.lastname;

knex('service_centers')
  .leftJoin('service_jobs','service_jobs.service_center_id','=','service_centers.id')
  .leftJoin('jobs', 'jobs.id','=', 'service_jobs.job_id')
  .where('service_centers.id', '=', id)
  .select('service_centers.id'
    , 'service_centers.name'
    , 'sbd.type as brandtype'
    , 'jobs.name as jobname'
    , knex.raw('GROUP_CONCAT(??.?? AS ??)', ['jobs', 'job_availability', 'availjob']
  )
)

*/ 


server.listen(port, () => console.log(`~~ Listening on Port ${port} ~~`));
