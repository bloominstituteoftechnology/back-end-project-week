const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/backend-auth');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const server = express();
server.use(cors(corsOptions));
server.use(bodyParser.json());

routes(server);

server.listen(port, (req, res) => {
  console.log(`server listening on port ${port}`);
});
