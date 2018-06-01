const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./model/User');
const Note = require('./model/Note');

const server = express();
server.use(cors());
server.use(express.json());

const secret = 'poison';

// const db = require().mongoURL;

mongoose
    .connect('mongodb://localhost/backendLocalDB')
    //`mongodb://${loginInfo.username}:${loginInfo.password}@#####.mlab.com:####/lambda-notes`
    .then(() => console.log('...API Connected to Database...'))
    .catch(err => console.log('***Error Connecting to Database***', err));

server.use('/api/note', noteRouter);
server.use('/api/user', userRouter);

server.get('/', (req, res) => res.send('API running...'));

const port = process.env.PORT || 5005;
server.listen(port, () => {
    console.log(`Server up and running on ${port}`)
});