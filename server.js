const express = require('express'); 
const helmet = require('helmet');
const mongoose = require('mongoose');

const server = express();

// add your server code
server.use(helmet());
server.use(express.json());

// root route
server.get('/', (req, res) => {
  res.status(200).json({api: 'running'})
});


// connecting mongoose to local host
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Todo-App');

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});