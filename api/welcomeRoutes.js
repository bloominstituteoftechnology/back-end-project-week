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
      userid: user.id,
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
    res.status(200).json({message: `MJK-LSN /welcome is runningon port ${PORT}.`})
})

welcome.get('/test/', (req,res) => {
    console.log(req.params.id)
    dbFunc.getUser().then(allUser => {
        res.status(200).send(allUser)
    })
})

welcome.post('/register', (req, res) => {
    console.log(req)
    const newUser = req.body; 
    console.log(newUser)
    const hash = bcrypt.hashSync(newUser.password, 3);
    // console.log(hash)
    newUser.password = hash
    dbFunc.addUser(newUser).first().then(id2 => {
        console.log(id2)
        dbFunc.getUser(id2).then(user3 => {
            console.log(user3)
            const token = generateToken(user3);
            const username = user3.username
            console.log(username)
            const id3 = user3.id
            console.log(id3)
            res.status(200).json({message: "token created", token: token, username: username})
        }).catch(err => err.message)
    }).catch(err => { res.status(500).json(err.message)})   
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