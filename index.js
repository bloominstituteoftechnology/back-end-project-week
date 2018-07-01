const express = require('express');// common js modules
//import express from 'express'; es2015 modules
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const CORS = require('cors');
//const keys = require('./config/keys');
const server = express();//creates a running express server; this app object will set up to listen for http requests and route them
const corsOptions = {
  origin: '*',
  methods:'GET, HEAD, PUT, PATCH, POST, DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
};
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*' );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, x-Requested-With, Content-Type, Accept'
  );
  next();
});
server.use(bodyParser.json());
server.use(CORS(corsOptions));

//mongoose.connect(keys.mongoURI)

const noteController = require('./noteTracker/noteController');

server.use(express.json());
//server.use(cors(corsOptions));
//server.use(cors({
 /* const corsOptions = {
  //origin: 'https://frosty-brahmagupta-26a4e9.netlify.com/',
  origin:'http://localhost:3000/',
  credentials: true
};*/


server.get('/', (req, res) => {
    res.send("working")}); 
  

server.use('/api/note', noteController);

mongoose.Promise = global.Promise;
//mongoose.connect(keys.mongoURI);
mongoose.connect(process.env.mongo)
//mongoose.connect('mongodb://localhost/auth')
  .then(() => {
   console.log('Database is connected');
  })
  .catch(err => {
    console.log('error connecting to dev database:', err);
});



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