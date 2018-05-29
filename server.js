const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
let port = process.env.PORT || 3000;
const server = express();

// mongoose.connect('mongodb://ChickenChaser:bulldog1@ds139950.mlab.com:39950/lambda-notes')
//   .then(() => {
//     console.log('connected to database!');
//   })
//   .catch(err => {
//     console.log(err);
//   })

server.use(cors({}))
server.use(helmet());
server.use(express.json());

server.get('/', (req, res) => {
  res.json({status: 'connected'})
})

server.listen(port , () => {
  console.log(`server listening on port ${port}`);
})
