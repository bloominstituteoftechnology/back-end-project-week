const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./UserModel');

const PORT = process.env.PORT || 5000;

const server = express();

//use middleware
server.use(helmet());
server.use(express.json());
server.use(cors());

const dbCred = {
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD
};

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
    .connect(`mongodb://${dbCred.dbUser}:${dbCred.dbPassword}@ds263619.mlab.com:63619/notes`)
    .then(response => {
        console.log('\n===Connected to DB===\n');
    })
    .catch(err => {
        console.log('Error connecting to DB');
    });

server.listen(PORT, () => {
    console.log('Connected to Server');
});


