//Create express server
const express = require('express');
const server = express();

//Add built-in and 3rd party middleware
server.use(express.json());
const cors = require('cors');
server.use(cors());

//testing endpoint
server.get('/', (req,res)=>{
  res.json({server: "is running"});
})


module.exports = server;