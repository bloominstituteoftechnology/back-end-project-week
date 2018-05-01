2 + 2 === 4;
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const server = express();

const port = 5000;


mongoose.connect('mongodb://heroku_20g8ndz2:5er5o5d19qcdnj3v92fegvvh6m@ds111050.mlab.com:11050/heroku_20g8ndz2', {}, err => {
    if(err) return console.log(err);
    console.log('Mango Up Bruh');
})

server.get('/', (req, res) => {
    res.status(200).json({api: 'harambe'})
})


server.listen(port, err => {
    if (err) console.log(err);
    console.log(`Mangos Grown at ${port}`)
})



