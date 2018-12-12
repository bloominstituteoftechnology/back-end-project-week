const express = require('express');
const server = express();
server.use(express.json());
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)
const cors = require('cors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secret = require('./_secrets/keys').jwtKey
server.use(cors())

// #region notes api
server.get('/notes', (req, res) => {

    db('notes')
        .then(notes => {
            res.status(200).json(notes)
        })
        .catch(err => {
            res.status(500).json({ message: 'Server error', err })
        })
})

server.get('/notes/:id', (req, res) => {
    const id = req.params

    db('notes') 
        .where(id)
        .then(note => {
            if(note.length === 0) {
                res.status(404).json({ message: 'Could not find note by id' })
            } else {
                res.status(200).json(note)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error processing your request' })
        })
})

server.post('/notes', (req, res) => {
    const post = req.body

    if(!post.title || post.content.length === 0) {
        res.status(404).json({ message: 'Please insert a title and some content' })
    } else {
        db('notes').insert(post)
            .then(id => {
                res.status(201).json({ id: id, post })
            })
            .catch(err => {
                res.status(500).json({ message: 'error adding note' })
            })
    }
})

server.put('/:id/edit-note', (req, res) => {
    const post = req.body
    const id = req.params

    if(!post.title || post.content.length === 0) {
        res.status(404).json({ message: 'Please insert a title and some content' })
    } else {
    db('notes')
        .where(id)
        .update(req.body)
        .then(count => {
            if(count === 0) {
                res.status(404).json({ message: 'post by id can not be updated' })
            } else {
                res.status(200).json(req.body)
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error updating post', err })
        })
    }

})

server.delete('/notes/:id', (req, res) => {
    const id = req.params

    db('notes')
        .where(id)
        .del()
        .then(count => {
            if(count === 0) {
                res.status(404).json({ message: 'Can not delete note by this id' })
            } else {
                res.status(200).json({ message: `succesfully deleted`, count })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'error deleting note', err })
        })
})

//#endregion

//#region user api

//#endregion
server.post('/register', (req, res) => {
    const creds = req.body

    const hash = bcrypt.hashSync(creds.password, 14)
    creds.password = hash;

    db('users')
        .insert(creds)
        .then(ids => {
            const id = ids[0]
            res.status(201).json({ newUserId: id })
        })
        .catch(err => {
            res.status(500).json({ message: 'error', err })
          })

})

function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    }
  
    const options = {
      expiresIn: '1hr'
    }
  
    return jwt.sign(payload, secret, options)
  }

server.post('/login', (req, res) => {
    const creds = req.body

    db('users') 
        .where({ username: creds.username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(creds.password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({ welcome: user.username, token })
            } else {
                res.status(401).json({ messsage: 'error logging in' })
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'server error', err })
          })
})

// #endregion

module.exports = server;