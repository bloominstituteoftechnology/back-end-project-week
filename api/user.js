const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./../data/helpers/usersDB');

const router = express.Router();

const secret = 'Are you suggesting coconuts migrate?'

function generateToken(user) {
    const payload = {
        username: user.username,
        password: user.password
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secret, options)
}

router.get('/', (req, res) => {
    db.get()
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.post('/register', (req, res) => {
    const {username, password }= req.body;
    if(!username || !password) {
        res.status(400).json({error: 'You must provide a username and password.'})
    }
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    db.insert(user)
    .then(user => {
        const token = generateToken(user)
        res.redirect(201, 'http://localhost:3000').json(token);
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error saving user to the database.'})
    })
})

router.post('/login', (req, res) => {
    const credentials = req.body;
    db.login(credentials)
    .then(user => {
        if(user && bcrypt.compareSync(credentials.password, user.password)) {
            const token = generateToken(user);
            res.redirect(201, 'http://localhost:3000').json(token)
        }
        else {
            return res.status(401).send('Incorrect credentials')
        }
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error logging in.'})
    })
})

router.put('/:id', (req, res) => {
    const updated = req.body;
    const id = req.params.id;
    db.update(id, updated)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error saving changes to the database.'})
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({error: 'There was an error deleting the post.'})
    })
})

module.exports = router;