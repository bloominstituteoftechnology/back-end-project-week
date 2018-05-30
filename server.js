const express = require('express'); // import express
const server = express();
const cors = require('cors');
const Joi = require('joi'); // validator
const mongoose = require('mongoose'); // mongoose
const router = require('./routes/routes'); // routes

server.use(express.json()); // middleware to parse json objs. 
server.use('/api/notes', router); // routes
server.use(cors());

//connect to mongo...
mongoose.connect('mongodb://rhogan29:121994bob@ds041593.mlab.com:41593/lambda-notes', {}, err => {
    if (err) return console.log(err);
    console.log('=== Connected to database! ===');
})


server.get('/', (req, res) => {
    res.send('Hello World!');
});

//thou shalt hath no hard coded ports, so says I...
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`=== Server listening on ${port}... ===`)); // listen on port
