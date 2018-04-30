2 + 2 === 4;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const server = express();

const port = 5000;


mongoose.connect('mongodb://swedishgoodbye:Basser66@ds263089.mlab.com:63089/swedishgood-note', {}, err => {
    if(err) return console.log(err);
    console.log('Mango Up Bruh');
})

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`Mangos Grown at ${port}`)
})

