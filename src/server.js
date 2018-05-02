const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const port = process.env.PORT || 5000;

const server = express();

const routes = require('./routes/routes.js');

mongoose.promse = global.promise;
mongoose
  .connect('mongodb://localhost/lambdanotes')
  .then(connect => {
    console.log('===connected to mongo');
  })
  .catch(error => {
    console.log('error connecting to mongo');
  });

const corsOptions = {};
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());

routes(server);

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});

module.exports = { server };
