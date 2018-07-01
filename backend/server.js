require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const server = express();
const userRouter = require('./users/userRouter.js');
const noteRouter = require('./notes/noteRouter.js');

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', function(req, res) {
    res.status(200).json({api: 'running'});
});

server.use('/api/notes', noteRouter);
server.use('/api/users', userRouter);

// mongoose.Promise = global.Promise;
mongoose.connect("mongodb://dbuser:dbuser1@ds016068.mlab.com:16068/back-end-project-week")
    .then( () => {
        console.log('we did it')
    })
    .catch(error => {
        console.log(error)
    })

const port = process.env.PORT || 5001;
server.listen(port, () => {
    console.log(`\n===API running on http://localhost:${port} ===\n`);
});
