// import all required modules
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
let port = process.env.PORT || 3000;
const server = express();
const registerRoute = require('./Routes/register');

// database connection
mongoose.connect('mongodb://eric:x@ds139950.mlab.com:39950/lambda-notes')
  .then(() => {
    console.log('connected to database!');
  })
  .catch(err => {
    console.log(err);
  })
// mount middleware
server.use(cors({}))
server.use(helmet());
server.use(express.json());

// sanitation check
server.get('/', (req, res) => {
  res.json({status: 'connected'})
})
// server routes
server.use('/register', registerRoute);
server.use(/api/notes, )

//port listener
server.listen(port , () => {
  console.log(`server listening on port ${port}`);
})
