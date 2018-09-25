const express = require('express');
const server = express();
server.use(express.json()); 

const knex = require('knex'); 
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const cors = require('cors'); 
server.use(cors()); 

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

server.get('/', (req, res) => {
    res.send('We are a go Mr. Snowblow!'); 
})


//==============MIDDLEWARE=================//

const secret = 'secret';
function generateToken(user) {
    const payload = {
        username: user.username,
        department: user.department, 
    };
    const options = {
        expiresIn: '1h',
        jwtid: '123456',
    };
    return jwt.sign(payload, secret, options); 
}

function protected(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({error: "You have provided an invalid token."});
            } else {
                req.user = {
                    username: decodedToken.username,
                    department: decodedToken.department,
                }; 
                next();
            }
        });
    } else {
        res.status(401).json({error: "Where's ya token pal?"})
    }
}

//===============ENDPOINTS==============//

server.post("/register", (req, res) => {
    const credentials = req.body; 
    const hash = bcrypt.hashSync(credentials.password, 10);
    credentials.password = hash; 
    
    db('users')
        .insert(credentials)
        .then(ids => {
            const id = ids[0];
        
            db('users')
                .where({id})
                .first()
                .then(user => {
                    const token = generateToken(user); 
                    res.status(201).json({id: user.id, token});
                }) 
                .catch(err => {
                    res.status(500).json({error: "Could not register the given user."})
                })
        })
})


server.post("/login", (req, res) => {
    const credentials = req.body; 

    db('users')
        .where({username: credentials.username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(credentials.password, user.password)) {
                const token = generateToken(user); 
                res.status(201).json({token});
            } else {
                res.status(401).json({error: "Could not login."})}
            }) 
        .catch(err => {
            res.status(500).json({error: "Could not login with given information."});
        })
})


server.get('/notes', protected, (req, res) => {
    db('notes')
        .then(notes => {
            res.status(201).json({notes});
        })
        .catch(err => {
            res.status(500).json({err: "Failed to get notes from notes table."})
        })
})

server.post('/notes', (req, res) => {
    const note = req.body; 

    db.insert(note).into('notes')
        .then(notes => {
            res.status(201).json({notes});
        })
        .catch(err => {
            res.status(500).json({err: "Failed to add notes to notes table."})
        })
})

server.put('/notes/:id', (req, res) => {
    const [id, body] = [req.params.id, req.body];

    db('notes')
        .where('id', id)
        .update({
            'title': body.title,
            'note': body.note, 
        })
        .then(notes => {
            res.status(201).json({notes});
        })
        .catch(err => {
            res.status(500).json({err: "Failed to modify note in notes table."})
        })
})


server.delete('/notes/:id', (req, res) => {
    const id = req.params.id;

    db('notes')
        .where('id', id)
        .del()
        .then(notes => {
            res.status(201).json({notes});
        })
        .catch(err => {
            res.status(500).json({err: "Failed to delete note in notes table."})
        })
})

module.exports = server;