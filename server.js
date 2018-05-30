const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./api/users');
const notes = require('./api/notes');

const server = express();
server.use(cors());
server.use(express.json());

// const db = require().mongoURL;

mongoose
    .connect(db)
    .then(() => console.log('...API Connected to Database...'))
    .catch(err => console.log('***Error Connecting to Database***', err));

server.use('/api/note', noteRouter);
server.use('/api/user', userRouter);

server.get('/', (req, res) => res.send('API running...'));

const port = process.env.PORT || 5005;
server.listen(port, () => {
    console.log(`Server up and running on ${port}`)
});