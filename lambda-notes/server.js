const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const server = express();
require('dotenv').config();
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

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/notesapp', {}, err => {
    if (err) console.log(err);
    console.log("Mongoose is connected to your db!");
})

const port = process.env.port || 5001;
server.listen(port, () => {
    console.log(`\n===API running on http://localhost:${port} ===\n`);
});
