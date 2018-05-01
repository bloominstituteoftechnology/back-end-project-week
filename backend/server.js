// 2 + 2 === 4;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const mongodb = require('mongodb')
const server = express();

const port = 5000;
const url = process.env.MONGOLAB_URI;


mongoose.connect('mongodb://swede:Basser@ds263089.mlab.com:63089/swedishgood-note', {}, err => {
    if(err) return console.log(err);
    console.log('Mango Up Bruh');
})

server.get('/notes', (req, res) => {
    res.status(200).json({api: 'harambe'})
})


server.listen(port, err => {
    if (err) console.log(err);
    console.log(`Mangos Grown at ${port}`)
})



