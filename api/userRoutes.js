const express = require('express');
const bcrypt = require('bcryptjs');

const user = express.Router();

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

user.use(express.json());

user.get('/', (req, res) => {
    res.status(200).json({message: `MJK-LSN /users is runningon port ${PORT}.`})
})

user.get('/settings/', (req,res) => {
    console.log(req.userid)
    dbFunc.getUserSettings(req.userid).then(userSettings => {
        res.status(200).send(userSettings)
    }).catch(err => {
        res.staus(400).json(err, 'bad request or database error from /settings/:username')
    })
})

module.exports = user