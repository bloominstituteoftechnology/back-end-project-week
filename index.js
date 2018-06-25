const express = require('express');// common js modules
//import express from 'express'; es2015 modules
const mongoose = require('mongoose');
const keys = require('./config/keys');
//require('./models/User');
//require('./models/Notes');



//const User = mongoose.model('users');


mongoose.connect(keys.mongoURI);

const app = express();//creates a running express server; this app object will set up to listen for http requests and route them


app.get('/', (req, res) => { // creates a route handler; get is a method that gets some information about some record; req js object that represents incoming request
//and has data about who is making request and some associated data within it
// res has the data that will be returned to user that made request
    res.send({ bye: 'buddy' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT);