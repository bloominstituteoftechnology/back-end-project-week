const express = require('express');
const bcrypt = require('bcrypt');

const generateToken = require('./generateToken');
const db = require('../database/dbConfig');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;

function login (req, res) {
    // implement user login
    const creds = req.body;

    if(!creds.username || !creds.password) {
        res.status(422).json({message: 'username and password both required'});
        return;
    }

    db('users').where({username: creds.username}).first()
    .then(user => {
        if (user && bcrypt.compareSync(creds.password, user.password)){
            const token = generateToken(user);
            res.status(200).json({message: 'success', token})
        } else {
            res.status(401).json({ message: 'error loggin in' });
        }
    })
    .catch(err => res.json(err))
}

async function register(req, res) {
    // implement user registration
    try {
        const creds = req.body;
    
        if(!creds.username || !creds.password) {
            res.status(422).json({message: 'username and password both required'});
            return;
        }
        creds.password = bcrypt.hashSync(creds.password, 8);
    
        const idArray = await db('users').returning('id').insert(creds);

        const newId = idArray[0];
        const newUser = await db('users').where('id', '=', newId).first();
        const token = generateToken(newUser);
        res.status(200).json({message: 'success', token})

    } catch(err) {
        res.json(err)
    }
}
