// Import Dependencies 
const express = require('express'); // makes it easy to use node
const helmet = require('helmet'); // secure express apps
const cors = require('cors'); // allow cross-platform use
const mongoose = require('mongoose'); // allow mongoDB syntax
const bodyParser = require('body-parser'); // parse incoming body requests
// import router
const port = 3000; // declare static port
const server = express(); // connect server to express


// Connect to DB
mongoose
.connect('mongodb://localhost/notesDB', { useMongoClient: true })
.then(mongo => {
    console.log('Properly connected to the notes DB. Well done!')
})
.catch(err => {
    console.log(err)
})


// Use the middleware
server.use(helmet());
server.use(cors());
server.use(bodyParser.json());
// use Router


// API Request Endpoints
server.get('/', (req, res) => {
    res.status(200).json({ api: running });
});

// Engage Server
server.listen(port, () => console.log(`\n === API is up and running on: ${port} === \n`))
