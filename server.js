const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const helmet = require('helmet')
const db = require('./data/dbConfig');
const server = express();



server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.get('/api', (req, res, next) => {
  res.status(200).json({'message':'API server running'})
})

// const port = 8000;
// server.listen(port, ()=>{
//   console.log(`---Server Running on Port ${port}`);
// })

module.exports = server;