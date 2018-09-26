const express = require('express');
const bcrypt = require('bcryptjs');

const welcome = express.Router();

const dbFunc = require('../db/db.js')

const dbEngine = process.env.DB || 'development';

const dbConfig = require('../knexfile.js')[dbEngine];

const knex = require('knex');
const uniqid = require('uniqid')
// const dbConfig = require('../knexfile');

const { jwtKey } = require('../_secrets/keys.js')

const jwt = require('jsonwebtoken')

const db = knex(dbConfig);

function generateToken(user){
    const payload = {
      username: user.username,
      email: user.email
    }

    const options = {
      expiresIn: '2w',
      jwtid: uniqid(),
    }

    return jwt.sign(payload, jwtKey, options)
}

welcome.use(express.json());

welcome.get('/', (req, res) => {
    res.status(200).json({message: "MJK-LSN /welcome is running."})
})

welcome.post('/register', (req, res) => {
    const newUser = req.body; 
    // console.log(newUser)
    const hash = bcrypt.hashSync(newUser.password, 3);
    // console.log(hash)
    newUser.password = hash

    dbFunc.addUser(newUser).then(id => {
        console.log(id)
        dbFunc.getUser(id).then(user => {//I don't think this is actually doing anything 
            console.log(user)
            const token = generateToken(user);
            res.status(200).json({message: "token created", token: token, username: user.username, userId: newUser.id})
        }).catch({message: "user added but token not generated"})
    }).catch(err => {
        res.status(500).json({message: "there was a problem creating a new user", error: err})
    })
})

welcome.post('/login', (req, res) => {
    const request = req.body; 
    db('users')
    .where({username: request.username})
    .first()
    .then(dbUser => {

        if (dbUser && bcrypt.compareSync(request.password, dbUser.password)){
            const token = generateToken(dbUser);
            res.status(200).json({message: "token created", token: token, username: dbUser.username, userId: dbUser.id})
        } else {
            res.status(401).json({message: "not authorized"})
        }
    }).catch(err => res.status(500).json({message: 'server error', error: err}))
})


module.exports = welcome