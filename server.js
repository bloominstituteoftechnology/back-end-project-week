const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors'); 
const helmet = require('helmet');
const config = require("./config.js");
const mongoose = require("mongoose");


const server = express(); 

// const noteController = require("./controllers/noteController");



server.use(cors({})); 
server.use(bodyParser.json()); 
server.use(helmet());
// server.use("/api/notes", noteController);

// server.get('/', (req, res) => {
//     res.json({Message: "Up and at'um!"});
// });

const routes = require('./api/routes/index');

routes(server);



module.exports = server;
  