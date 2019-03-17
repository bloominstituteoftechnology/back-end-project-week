const notes = require('../data/notesModel.js')
const express = require('express')
const server = express()
const cors = require('cors')
server.use(cors())
server.use(express.json())


const admin = require("firebase-admin")
const serviceAccount = require("../config.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://lolas-notes.firebaseio.com"
});



const restricted = (req, res, next) => {
    const token = req.headers.authorization
    if (req.url.includes('/restricted')) {
        if (token) {
            admin
                .auth()
                .verifyIdToken(token)
                .then((decodedToken) => {
                    const uid = decodedToken.uid;
                    req.uid = uid
                    next()
                })
                .catch((error) => {
                    res.status(401).json({ message: 'invalid token' }, error)
                });
        } else {
            res.status(401).json({ message: 'no token' })
        }
    } else {
        next()
    }
}

server.use(restricted)

server.get('/', (req, res) => {
  res.status(200).json({ api: 'alive' })
})

server.get('/restricted/notes', (req, res) => {
    const { uid } = req
    notes.getByAuthor(uid)
    .then(notes => res.status(200).json(notes))
    .catch(err => res.status(500).json(err))
})

server.get('/restricted/notes/:id', (req, res) => {
    const { uid } = req
    const { id } = req.params
    notes.getByNote(id, uid)
    .catch(err => res.status(500).json(err))
})

server.post('/restricted/notes', (req, res) => {
    const { uid } = req
    const { title, content } = req.body
    if (title && content && uid) {
        const note = { title, content, uid }
        notes.add(note)
        .then(note => res.status(201).json(note))
        .catch(err => res.status(500).json(err))
    } else {
        res.status(422).json({ message: 'Please enter note title and content.' })
    }
})

server.put('/restricted/notes/:id', (req, res) => {
    const { uid } = req
    const { id } = req.params
    const { title, content } = req.body
    if (title && content && uid) {
        const note = { title, content, uid }
        notes.update(id, uid, note)
        .then(result => result ? res.status(200).json(result) : res.status(500).json({ message: 'No note updated.' }))
        .catch(err => res.status(500).json(err))
    }  else {
        res.status(422).json({ message: 'Please enter note title and content.' })
    }
})

server.delete('/restricted/notes/:id', (req, res) => {
    const { uid } = req
    const { id } = req.params
    notes.remove(id, uid)
    .then(result => result ? res.status(200).json(result) : res.status(500).json({ message: 'No notes deleted.' }))
    .catch(err => res.status(500).json(err))
})

module.exports = server;
