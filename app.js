const mongoose = require('mongoose');
const server = require('./server');
const PORT = process.env.PORT || 5000;
const express = require('express');

mongoose.connect('mongodb://localhost/backEnd', {}, err => {
    if(err) return console.log(err);
    console.log('Connected to Mongo');
});

server.listen(port, err => {
    if(err) console.log(err);
    console.log(`Server running on ${port}`)
})

// express()
//     .listen(PORT, () => console.log(`Listening on ${PORT}`))
