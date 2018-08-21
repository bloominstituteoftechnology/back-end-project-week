const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const db = require('./data/dbConfig');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors({ origin: 'http://localhost:3000' }));


// configure jwt
const secret = 'ems secret key!';


function generateToken(user) {
  const payload = {
    name: user.name,
    password: user.password,

  };

  const options = {
    expiresIn: '1h',
    jwtid: 'whitehairsucks',
  };

  return jwt.sign(payload, secret, options);
}

function restricted(req, res, next) {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return res
          .status(401)
          .json({ error: 'not authorized -token invalid' });
      }

      req.jwtToken = decodedToken;
      next();
    });
  } else {
    return res.status(401).json({ error: 'Not authorized- no token' });
  }

}

//*******Home Page Endpoint******************
server.get('/', (req, res) => {
  res.send('Hello World');
});


//********USERS Endpoint******************
server.get('/users', restricted, (req, res) => {
    db('users').select('id', 'name', 'password', 'email')
    .then(response => {
            res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json('Sorry, you do not have access');
    })
});

server.post('/register', function(req, res) {
  const user = req.body;

  // hash password
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  db('users')
    .insert(user)
    .then(function(ids) {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(user => {
          // generate the token
          const token = generateToken(user);
          // req.session.username = user.username;

          // attach the token to the response
          res.status(201).json(token);
        });
    })
    .catch(function(error) {
      res.status(500).json({ error });
    });
});

server.post('/api/login', (req, res) => {
	const identity = req.body;

	db('users')
		.where({ name: identity.name})
		.first()
		.then(function(user){
			const passwordsMatch = bcrypt.compareSync(
			  	identity.password, user.password
			);
				if (user && passwordsMatch) {
					 const token = generateToken(user);
					res.send(token);
				} else {
					return res.status(401).json({ error: 'Opps..Login unsuccessful, Please try again'});
				}
		})
			.catch(function(error) {
				res.send(500).json({ error });
			})
});
server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db('users').where({id: Number(id)})
    .then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({error: 'Unable to retrieve user information.'})
    })
});

server.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    db('users').where({id: Number(id)})
    .update(user)
    .then(response => {
        res.status(201).json({response})
    }).catch(err => {res.status(500).json(err)
    })
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    db('users').where({id: Number(id)})
    .delete(user)
    .then(response => {
        res.status(201).json({response})
    }).catch(err => {res.status(500).json(err)
    })
});

//*********NOTES ENDPOINTS*********************************
server.get('/notes', (req, res) => {
    db('notes')
        .then( notes => {
            res.status(200).json(notes)
        })
        .catch( error => {
            res.status(500).json({ error: "Error retrieving posts" })
        })
});

server.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    db('notes').where({id: Number(id)})
    .then(response => {
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({error: 'Unable to retrieve note information.'})
    })
});

server.post('/api/notes', (req,res) => {
  const newNoteInfo = req.body;
  db('notes')
    .insert(newNoteInfo)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      if(err.error === 19){
      	res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
      } else {
      	res.status(500).json({ error: "There was an error while saving the post to the database" });
      }
    });
});

server.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const note = req.body;
    db('notes').where({id: Number(id)})
    .update(note)
    .then(response => {
        res.status(201).json({response})
    }).catch(err => {res.status(500).json(err)
    })
});

server.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    const note = req.body;
    db('notes').where({id: Number(id)})
    .delete()
    .then(response => {
        res.status(201).json({response})
    }).catch(err => {res.status(500).json(err)
    })
});






const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
