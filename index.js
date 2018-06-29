const express = require('express');// common js modules
//import express from 'express'; es2015 modules
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
//const keys = require('./config/keys');


//mongoose.connect(keys.mongoURI)
const server = express();//creates a running express server; this app object will set up to listen for http requests and route them
const noteController = require('./noteTracker/noteController');

server.use(express.json());

server.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

server.get('/', (req, res) => {
    res.send("working")}); 
  

server.use('/api/note', noteController);

mongoose.Promise = global.Promise;
//mongoose.connect(keys.mongoURI);
/*mongoose.connect('mongodb://localhost/dbnoteTracker', {}, err => {
  if (err) console.log(err);
  console.log('Mongoose connected us to our DB');
});*/



/*app.get('/', (req, res) => { // creates a route handler; get is a method that gets some information about some record; req js object that represents incoming request
//and has data about who is making request and some associated data within it
// res has the data that will be returned to user that made request
    res.send({ bye: 'buddy' });
});*/


/*const PORT = process.env.PORT || 5001;
app.listen(PORT);*/

const port = process.env.PORT || 5001;

server.listen(port, () => {
    console.log(`Server up and running on ${port}`);
  });