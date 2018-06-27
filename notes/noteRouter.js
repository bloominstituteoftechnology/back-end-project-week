const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId; 
const Note = require('./Note.js');
const secret = "toss me, but don't tell the elf!";
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', restricted, (req, res) => {
    const { title, body, user } = req.body;
    if (!title || !body || !user) {
        res.status(400).json({ errorMessage: "Please provide title, body, and user for the note." })
        return;
    }
    Note.create(req.body)
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json({ error: err.message }));
})

router
    .route('/:id', restricted)
        .get((req, res) => {
            const { id } = req.params;
            Note.find({
                user: ObjectId(id)
            })
            .then(note => res.json(note))
            .catch(err => res.status(500).json({ error: err.message }))
        })
        .delete((req, res) => {
            const { id } = req.params;
            Note.findByIdAndRemove(id)
                .then(note => res.json(note))
                .catch(err => res.status(500).json({ error: err.message }))
        })
        .put((req, res) => {
            const { id } = req.params;
            const { title, body } = req.body;
             Note.findByIdAndUpdate(id, { title, body })
                .then(note => res.json(note))
                .catch(err => res.status(500).json({ error: err.message }))
        });

function restricted(req, res, next) {
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          return res
            .status(401)
            .json({ message: 'you shall not pass! not decoded' });
        }
        next();
      });
    } else {
      res.status(401).json({ message: 'you shall not pass! no token' });
    }
  }
          
module.exports = router;