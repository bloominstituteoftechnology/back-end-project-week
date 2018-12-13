require('dotenv').config()
const express = require('express');
const server = express();
const db = require('./notedb.js')
const userdb = require('./userdb.js')
const cors = require('cors');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const protect = require('./protect.js')


server.use(express.json())
server.use(cors());

server.get('/api/notes', (req,res) => {
    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET)
    console.log(decoded.subject)
    db.getNotes(decoded.subject)
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.get('/api/users', (req,res) => {
    db.getUsers()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

server.post('/api/users/register', (req, res) => {
    let userCred = req.body;
    const hash = bcrypt.hashSync(userCred.password, 8);
    userCred.password = hash;
    userdb.register(userCred)
    .then(id => {
        const payload = {
            "id": id[0],
            "username": userCred.username
        }
        console.log(payload)
        const token = generateToken(payload)
        res.status(201).json(token)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    };
    const secret = process.env.SECRET;
    const options = {
      expiresIn: '20m',
    };
    return jwt.sign(payload, secret, options);
}

server.post('/api/users/login', (req, res) => {
    let userCred = req.body;
    userdb.login(userCred)
    .then(user => {
        if(user && bcrypt.compareSync(userCred.password, user[0].password)) {
            const userInfo = user[0];
            const token = generateToken(userInfo);
            res.status(200).json(token) //WE REACH THIS
            
        } else {
            res.status(401).json({message: 'Invalid information'})
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
})


server.post('/api/notes', async (req, res) => {
    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET)
    const note = await req.body;
    const completeNote = {
        "Title": note.Title,
        "Content": note.Content,
        "user_id": decoded.subject
    }
    console.log(completeNote)
    db.createNote(completeNote)
    .then(id => {
        res.status(201).json(id);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})


server.get('/api/notes/:id', (req,res) => {
    const id = req.params.id;
    db.viewNote(id)
    .then(note => {
        res.status(200).json(note);
    })
    .catch(err => {
        res.status(404).json(err);
    })
})

server.put('/api/notes/:id', (req, res)  => {
    const id = req.params.id;
    const content = req.body;
    db.editNote(content, id)
    .then(num => {
        res.status(200).json(num);
    })
    .catch(err => {
        res.status(400).json(err);
    })
})

server.delete('/api/notes/:id',  (req, res) => {
    const id = req.params.id;
    db.deleteNote(id)
    .then(num => {
        res.status(200).json(num);
    })
    .catch(err => {
        res.status(404).json(err);
    })
})

module.exports = server;