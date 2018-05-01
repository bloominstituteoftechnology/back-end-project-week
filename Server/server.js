const express = require('express'); // remember to install your npm packages
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();

const setupMiddleware = require('./setup/middleware')(server);
const setupRoutes = require('./setup/routes')(server);

// Mongo code
const router = require('./setup/routes');
mongoose
  .connect('mongodb://localhost/survey')
  .then(() => console.log('\n=== connected to Mongo ===\n'))
  .catch(err => console.log('error connecting to DB'));
server.use('/api/', router);

// Sanity route
server.get('/', (req, res) => res.send('API running...'));

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
