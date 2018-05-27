const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');

const mySecret = require('./config');

const port = process.env.PORT || 3000;
const corsOptions = {
  "origin": "*",
  "credentials": true
};

const server = express();
server.use(express.json());
server.use(cors(corsOptions));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://knoxvillain:lambda15@ds237379.mlab.com:37379/notes', () => {
  console.log('MongoDB Running');
});

const routes = require('./back-end/routes/index');
routes(server);

server.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});

module.exports = server;
