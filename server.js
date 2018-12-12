const express = require('express');
const server = express();
server.use(express.json());
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)
const cors = require('cors')
const bcrypt = require('bcryptjs')
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



module.exports = server;