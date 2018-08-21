const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const helmet = require('helmet')
const notes = require('./data/helpers/notesHelpers');
const server = express();



server.use(express.json());
server.use(cors());
server.use(morgan('dev'));

server.get('/api', (req, res, next) => {
  res.status(200).json({'message':'API server running'})
})

server.get('/api/notes', async (req, res, next) =>{
 const result = await notes.find();
 console.log('get', result);
 res.status(200).json(result);
})

const port = 8000;
if(process.env.NODE_ENV !=='test') {
  server.listen(port, ()=>{
    console.log(`---Server Running on Port ${port}`);
  })
}

module.exports = server;