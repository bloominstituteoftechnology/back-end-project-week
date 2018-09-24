const express = require('express');
const helmet = require('helmet');
const knex = require('knex')
const cors = require('cors')
const server = express();
const bcrypt = require('bcryptjs');
const dbConfig = require('./knexfile')
const jwt = require('jsonwebtoken')
const session = require('express-session');
const jwtKey = require('./secret/keys').jwtKey;

const db = knex(dbConfig.development);


server.use(session(sessionConfig))
server.use(express.json());
server.use(helmet());
server.use(cors())

const generateToken = user => {
    const payload = {
        username: user.username
    }

    const options = {
        expiresIn: '1h',
        jwtid: '54321'
      }

    const token = jwt.sign(payload, jwtKey, options)
    return token
}

const protected = (req, res, next) => {

    const token = req.headers.authorization

    token ?
        jwt.verify(token, secret, (err, decodedToken) => {
            err ?
                res.status(401).json({ message: 'invalid username or password' })
                :
                req.username = decodedToken.username
            next()
        })
        :
        res.status(401).json({ message: 'invalid username or password' })

}

server.get('/', (req, res) => {
    res.send('Api Online')
})





const port = 3500;
server.listen(port, function () {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});