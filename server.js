const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const session = require('express-session');

const server = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http:localhost:3000',
  credentials: true,
};

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(
  session({
    secret: 'e5SPiqsEtjexkTj3Xqovsjzq8ovjfgVDFMfUzSmJO21dtXs4re',
    resave: true,
    saveUninitialized: false,
  })
);

routes(server);

mongoose
  .connect('mongodb://localhost/LambdaNotes')
  .then(connect => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Database connection failed');
  });

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
