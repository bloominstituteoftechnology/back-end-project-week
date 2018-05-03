const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 5000;

const server = express();

const middleware = require('./middleware.js')(server);
const UserRoutes = require('./Controllers/userRoutes.js')(server);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('\n==== Connected to Mongo ====\n');
  })
  .catch(() => {
    console.log('\n++++ ERROR connecting to Mongo ++++\n');
  });

server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
