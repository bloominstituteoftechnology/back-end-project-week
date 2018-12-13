const bcrypt = require('bcryptjs');
const { authenticate, generateToken, generateTokenReg } = require('./middlewares.js');
const db = require('../database/dbConfig.js');


module.exports = server => {
    server.post('/note/register', register);
    server.post('/note/login', login);
    server.get('/note/get/all', authenticate, getNotes);
    server.get('/note/get/:id', authenticate, getOneNote);
    server.post('/note/create', authenticate, addNote);
    server.delete('/note/delete/:id', authenticate, deleteNote);
    server.put('/note/edit/:id', authenticate, editNote);
};

// REGISTER

function register(req, res) {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 13);
    creds.password = hash;
    db('users')
        .where({ username: creds.username })
        .returning('id')
        .insert(creds)
        .then(user => {
            console.log(creds);
            const token = generateTokenReg(user);
            res.status(201).json(token)
        })
        .catch(err => {
            res.status(500).json({ message: `unable to join` })
        });
};

// LOGIN 

function login(req, res) {
    const creds = req.body;
    db('users')
        .where({ username: creds.username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(201).json(token)
            } else {
                res.status(401).json({ message: 'nope' })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        });
};

// GET ALL NOTES

function getNotes(req, res) {
    db('notes')
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
};

// GET ONE NOTE

function getOneNote(req, res) {
    const { id } = req.params;
    db('notes')
        .where({ id })
        .first()
        .then(note => {
            res.status(200).json(note)
        })
        .catch(err => {
            res.status(500).json({ message: `note with ${id} not found` })
        });
};

// ADD NEW NOTE

function addNote(req, res) {
    const users_id = req.decoded.subject
    const { title, textBody } = req.body;
    req.body = { title, textBody, users_id };
    if (!title || !textBody) {
        console.log(users_id)
        res.status(422).json({ message: `Both title and content are required` })
    } else {
        db('notes')
            .insert(req.body)
            .then(ids => {
                console.log(users_id)
                res.status(201).json(ids)
            })
            .catch(err => {
                console.log(req.body)
                res.status(500).json(err)
            });
    };
};


// DELETE NOTE

function deleteNote(req, res) {
    const { id } = req.params;
    db('notes')
        .where({ id })
        .del()
        .then(count => {
            count
                ? res.status(200).json(count)
                : res.status(404).json({ message: `Note not found` })
        })
        .catch(err => {
            res.status(500).json({ err: `Error` })
        });
};

// EDIT NOTE

function editNote(req, res) {
    const changes = req.body;
    const { id } = req.params;
    db('notes')
        .where({ id })
        .first()
        .update(changes)
        .then(note => {
            note
                ? res.status(200).json(changes)
                : res.status(404).json({ message: `Note not found` })
        })
        .catch(err => {
            res.status(500).json({ message: `Error updating`, err })
        });
};

