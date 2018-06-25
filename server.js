const express  = require('express');
const port = 3333;
const mongoose = require('mongoose');
const cors = require('cors');
// const users = require('./userModel');
// const notes = require('./noteModel');

const server = express();
server.use(express.json());

// mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/dbLambdaNotes', {}, (err) => {
    if(err) {
        console.log(err);
        return;
    } 
    console.log("Successfully Connected to MongoDB");
});

// sanity check 
server.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
});