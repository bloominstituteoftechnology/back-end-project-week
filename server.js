const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const port = process.env.PORT || 5000;
const server = express();

const router = require('./routes/routes');

server.use(express.json());
server.use('/api/notes', router);
server.use(cors());


mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds011840.mlab.com:11840/lambda-notes', {}, err => {
    if (err) return console.log(err);
    console.log('=== Connected to database! ===');
})


server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(port, err => {
    if(err) console.log(err);
    console.log('Server running on ${port}');
})