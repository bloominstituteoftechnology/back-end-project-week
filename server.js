const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const noteController = require('./notes/noteController');
const userController = require('./users/userController');
const secret = 'supersecretsauce';

const server = express();

const allowedOrigins = ['http://localhost:3000', 'https://cocky-ride-fcf8cb.netlify.com'];
let origin = req.headers.origin;
if(allowedOrigins.indexOf(origin) < 0) origin = null;

server.use(cors({ origin: origin, credentials: true }));
server.use(express.json());

// https://cocky-ride-fcf8cb.netlify.com
// http://localhost:3000

app.use(function(req, res, next) {
    var allowedOrigins = ['http://localhost:3000', 'https://cocky-ride-fcf8cb.netlify.com'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
  });

function restricted(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            req.jwtPayload = decodedToken;
            if (err) {
                return res.status(401).json({ errorMessage: 'Please Sign In' })
            }

            next();
        })
    } else {
        res.status(401).json({ errorMessage: 'Please Sign In' });
    }
}

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running...' });
});

server.use('/user', userController);
server.use('/note', restricted, noteController);

const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://braden:passw0rd@ds119161.mlab.com:19161/lambdanotesdb', {}, (error) => {
    // also in mongo store
    if (error) console.log(error);
    console.log('Mongoose connected us to lambdanotesdb on mlab');
})

server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));