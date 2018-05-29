const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000
mongoose.connect('mongodb://ChickenChaser:bulldog1@ds139950.mlab.com:39950/lambda-notes')
  .then(() => {
    console.log('connected to databse!');
  })
  .catch(err => {
    console.log(err);
  })

server.use(cors({}))
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.json({status: 'connect'})
})

server.listen(port , () => {
  console.log(`server listening on port ${port}`);
})
