// libraries be like
const express = require('express');
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

//port me
const port = process.env.port || 5000;

//initializing lib lib
const server = express();
server.use(express.json());
server.use(cors());


// intializing mongoos unkill
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lambdanotes')


// route me in babi
const noteRouter = require('./notes/noteRouter')
server.use('/api/notes', noteRouter);



server.get('/', (req,res) => {
    console.log("yay") 
    res.send('API Running...')
});



server.listen(port, () => {
    console.log(`server up and running on ${port}`);
})