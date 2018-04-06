const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3030;
const session = require('express-session');

const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');

const corsOptions = {
  origin: `http://localhost:3000`,
  credentials: true,
};

const server = express();

mongoose
  .connect('mongodb://heroku_f6f35d4r:74c7oa0c2k8jtl6mhv2kkh9d4@ds235609.mlab.com:35609/heroku_f6f35d4r')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('There was an error connecting to MongoDB', err);
  });

server.use(cors(corsOptions));
server.use(express.json());
server.use(
  session({
    secret: 'rigby is a bird',
    resave: false,
    saveUninitialized: true,
    auth: false,
  })
);

server.use('/', userRoutes);
server.use('/notes', noteRoutes);


server.listen(port, () => console.log(`Server is listening on port ${port}`));
