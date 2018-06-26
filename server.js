// libraries be like
const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require('./config')

//port me
const port = process.env.port || 5000;

//initializing lib lib
const server = express();
server.use(express.json());
server.use(cors());

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// intializing mongoos unkill
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo)


// route me in babi
const noteRouter = require('./notes/noteRouter')
server.use('/api/notes', noteRouter);



server.get('/', (req,res) => {
    console.log(config.mongo) 
    res.send('API Running...')
});



server.listen(port, () => {
    console.log(` heyo server up and running on ${port}`);
})