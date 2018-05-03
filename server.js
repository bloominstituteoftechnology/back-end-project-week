const express = require ('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const axios = require('axios');

const cors = require('cors');
const mongoose =require('mongoose');
const mongodb = require('mongodb');

const userModel= require('./userModel')
const userRouter = require('./userRouter');
const noteModel = require('./noteModel');
const noteRouter = require('./noteRouter');

mongoose.connect('process.env.MONGODB_URI', function(err, database){
  if (err){
    console.log(err);
    process.exit(1);
  }
})
database;
console.log('database is connection ready')


const server = express();


server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());
server.use('/api/user', userRouter);
server.use('/api/note', noteRouter);

server.get('/api/user',  (req, res) => {
  res.send({api: 'running...' });
 });




const port = process.env.PORT || 5000;
server.listen(port, () =>console.log('server listening at port 5000'));
