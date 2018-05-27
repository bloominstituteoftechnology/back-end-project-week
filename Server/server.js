const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();

const setupMiddleware = require('./setup/middleware')(server);
const setupRoutes = require('./setup/routes')(server);

// Mongo code
const router = require('./setup/routes');
// console.log(process.env.PROD_MONGODB);
mongoose
  .connect(process.env.PROD_MONGODB)
  .then(() => console.log('\n=== connected to Mongo ===\n'))
  .catch(err => console.log('error connecting to DB'));
server.use('/', router);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
