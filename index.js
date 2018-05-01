const express = require('express');
const session = require('express-sessions');

const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./UserModel.js');

const PORT = process.env.PORT || 5000;

const server = express();

//use middleware
server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(
    session({
        secret: '',
        cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
        secure: false
    })
);

const dbCred = {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD
};

const setUpRoutes = require('./routes')(server);

server.get('/', (req, res) => {
    res.json({api:'running'});
});

server.get('/users', (req, res) => {
    User.find({})
    .then(response => {
        res.json(response);
    })
    .catch(err => {
        res.json(err);
    });
});

mongoose
    .connect('mongodb://jmoney:thepasswordiestBIG123@ds263619.mlab.com:63619/notes')
    .then(response => {
        console.log('\n===Connected to DB===\n');
    })
    .catch(err => {
        console.log('Error connecting to DB');
    });

server.listen(PORT, () => {
    console.log('Connected to Server');
});


