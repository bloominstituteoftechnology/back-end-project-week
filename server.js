const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const TodoController = require('./controllers/TodoController');
const AuthController = require('./controllers/AuthController');

const server = express();

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

server.use(allowCrossDomain);
server.use(cors())
server.use(helmet());
server.use(express.json());
server.use(morgan('combined'))
server.use('/api/todo', TodoController);
server.use('/api/user', AuthController);
server.use(express.static(path.join(__dirname, 'client/build')));

// root route
server.get('/', (req, res) => {
  res.status(200).json({
    api: 'running'
  })
});

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// connecting mongoose to local host and heroku
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Todo-App', {}, (err) => {
  if (err) console.log(err);
  console.log('Mongoose connected to Database server')
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});