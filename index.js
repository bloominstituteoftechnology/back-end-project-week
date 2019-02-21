const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile.js');
const bcrypt = require('bcryptjs');  // open source HASHING
const jwt = require('jsonwebtoken');   //instead of cookies & sessions

const server = express();
const db = knex(dbConfig.development);
const PORT = 3000;

server.use(express.json());  //body parser middleware

// CORS stuff
const cors = require('cors')
server.use(cors())

// Goal of Tokens in general (not authentication)
// Token used to persist authentication info (it's about data persistence, not authentication itself)
// with "tokens" the responsibility of keeping track of state is passed to the client

const secret = 'backtothefuture'; // generally comes from ENV variable

function generateToken(user){
    const payload = {
        username: user.username,
    };
    const options = {
        expiresIn: '1h',
        jwtid: '12345'   
    }

    return jwt.sign(payload, secret, options);    //anatomy of JSON Webtoken
}


server.get('/', (req , res) => {
    res.status(200).json({api: "Lambda Notes Backend!"})
})

// DB HELPERS IMPORT
const dbHelpers = require('./data/db_helpers');

// Registration/Login/Authentication
server.post('/register', (req, res) => {
    const creds = req.body;

    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;

    //db.insertUser(user)  ---> dbHelpers
    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0];

            //find the user using the id
            db('users')
                .where({id})
                .first()
                .then(user => {
                    const token = generateToken(user);
                    res.status(201).json({id: user.id, token })
                })
                .catch(err => res.status(500).send(err));
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

function protect(req, res, next){
    // use jwts instead of sessions
    // read the token string from the Authorization header
    const token = req.headers.authorization;

    if(token){
        //verify the token
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err){
                //token is invalid
                res.status(401).json({message: 'Invalid Token'});
            } else {
                //token is valid
                console.log('decodedToken', decodedToken);
                req.username = decodedToken.username;
                console.log('decodedToken username', decodedToken.username)
                //req.user.department or another feature?
                next();
            }
        });
        // we care about the difference between no token vs invalid token
        // because a tamper token signals an attack
    } else {
        res.status(401).json({message: 'no token provided'});
    }
}

// LOGIN (After Registration)
server.post('/login', (req, res) => {
    const creds = req.body;

    // db.findByUsername(creds.username) --> in dbHelpers
    db('users')
        .where({username: creds.username })
        .first()
        .then(user => {
            //username exists; compare potential password to password stored, and hashed, in database - via bcrypt library
            if(user && bcrypt.compareSync(creds.password, user.password)){
                //generate a token
                const token = generateToken(user);
                // attach that token to the response
                res.status(200).json({ token });
            } else {
                res.status(404).json({err: 'invalid username or password'});
            }
        })
        .catch(err => {
            res.status(500).send(err); // err: issue logging in, try again
        })
});

// PROTECTED ROUTES HERE


// Regular GET NOTES -- works.
server.get('/notes', protect, (req , res) => {
    dbHelpers.getNotes()
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err: 'Failed to get Notes'})
    })
})

// GET note by ID w db Helpers
server.get('/notes/:id', (req, res) => {
    const {id} = req.params;
    dbHelpers.getNotesById(id)  // db helpers
    .then(rows => {
        res.json(rows)
    })
    .catch(err => {
        res.status(500).json({err: "Failed to find specific NOTE by ID"});
    })
})

///POST notes
server.post('/notes', (req , res) => {
    const note = req.body;
    dbHelpers.insertNote(note)
    .then(note => res.status(201).json(note))
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "Error posting individual NOTE to the database"})
    })
})

//EDIT existing note
server.put('/notes/:id', (req, res) => {
    const {id} = req.params;
    const note = req.body;

    db('notes').where('id', id).update(note)
    .then(rowCount => {
        res.status(200).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: "Failed to Update specific NOTE"});
    })
})

//DELETE existing note
server.delete('/notes/:id', (req, res) => {
    const {id} = req.params;
    db('notes').where('id', id).del()
    .then(rowCount => {
        res.status(201).json(rowCount)
    })
    .catch(err => {
        res.status(500).json({err: "Failed to delete Note"})
    })
})






server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})