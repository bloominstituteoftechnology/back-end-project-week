const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;
const routes = require('./routes');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lambdanotes');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

const server = express();
server.use(bodyParser.json());
server.use(cors(corsOptions));
// server.use(express.json());

routes(server);

server.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});