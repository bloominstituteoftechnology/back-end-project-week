const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors'); 
const helmet = require('helmet');
const mongoose = require("mongoose");
const APIroutes = require('./api/routes');
const server = express();
APIroutes(server);

 

// const noteController = require("./controllers/noteController");



server.use(cors({})); 
server.use(bodyParser.json()); 
server.use(helmet());
// server.use("/api/notes", noteController);

// server.get('/', (req, res) => {
//     res.json({Message: "Up and at'um!"});
// });





module.exports = server;
  