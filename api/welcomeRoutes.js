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
    // console.log(req)
    const reqUser = req.body; 
    console.log(reqUser, '=====requser====')
    const hash = bcrypt.hashSync(reqUser.password, 3);
    // console.log(hash)
    reqUser.password = hash
    dbFunc.addUser(reqUser).first().then(newid => {
        console.log(newid, '=======newid========')
        dbFunc.getUser(newid).then(newUser => {
            console.log(newUser, '========newUser=======')
            const token = generateToken(newUser);
            console.log(token, '========token=======')
            const username = newUser.username
            console.log(username, "==========username=====")
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