// import express
const express = require('express');
const server = express();
const cors = require('cors');
// validator
const Joi = require('joi');
// mongoose
const mongoose = require('mongoose');
// routes
const router = require('./routes/routes');

// middleware to parse json objs. 
server.use(express.json());
// routes
server.use('/api/notes', router);
server.use(cors());

//connect to mongo
mongoose.connect('mongodb://user029:secret1123@ds041593.mlab.com:41593/lambda-notes', {}, err => {
    if (err) return console.log(err);
    console.log('=== Connected to database! ===');
})


server.get('/', (req, res) => {
    res.send('Hello World!');
});


// Thou shalt hath no hard-coded ports so says I...
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`=== Server listening on ${port}... ===`));
