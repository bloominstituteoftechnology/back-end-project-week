const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./api/Routes/Routes');

const server = express();

mongoose
  .connect(
    // 'mongodb://zack:zack123456@ds133340.mlab.com:33340/lambda-backend-project'
    'mongodb://localhost/backendProjTestDB'
  )
  .then(() => {
    console.log('\n=== Connected to mongo ===\n');
  })
  .catch(err => {
    console.log(err);
  });

server.use(helmet());
server.use(express.json());
server.use(cors());

routes(server);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
