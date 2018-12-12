const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');


const { authenticate, generateToken } = require('./middlewares');

module.exports = server => {
    server.get('/', home);
    server.get('/api/notes', authenticate, notesList);
    server.get('/api/notes/:id', noteById);
    server.post('/api/notes', postNote);
    server.put('/api/notes/:id', updateNote);
    server.delete('/api/notes/:id', deleteNote);
    server.post('/api/register', register);
    server.post('/api/login', login);
}

function home(req, res) {
    res.status(200).json({ api: 'running' });
}

function register(req, res) {
    const creds = req.body;
    const hash = bcrypt.hashSync(creds.password, 10);
    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(error => json(error))
}

function login(req, res) {
    const creds = req.body;

    db('users').where({ username: creds.username }).first()
        .then(user => {
            if (user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user);
                res.status(200).json({ message: `Welcome ${user.username}!`, token });
            } else {
                res.status(401).json({ message: 'You are not allowed here!' })
            }
        })
        .catch(error => res.json(error))
}

function notesList(req, res) {
    db('notes')
        .then(note => res.status(200).json(note))
        .catch(error => res.status(500).json(error))
}

function noteById(req, res) {
    const { id } = req.params;
    db('notes')
        .where({ id: id })
        .then(note => res.status(200).json(note))
        .catch(error => res.status(500).json(error));
}

function postNote(req, res){
    db.insert(req.body)
        .into('notes')
        .then(note => res.status(200).json(note))
        .catch(error => res.status(500).json(error));
}

function updateNote(req, res) {
    const { id } = req.params;
    db('notes')
        .where({ id: id })
        .update(req.body)
        .then(note => res.status(200).json(note))
        .catch(error => res.status(500).json(error));
}

function deleteNote(req, res) {
    const { id } = req.params;
    db('notes')
        .where({ id: id })
        .del()
        .then(note => res.status(200).json(note))
        .catch(error => res.status(500).json(error));
}
