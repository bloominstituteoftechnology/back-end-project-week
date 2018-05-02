//dependencies
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys')
require('./models/user');
require('./services/passport');
const chalkAnimation = require('chalk-animation');

//connect to external mongodb database
mongoose.connect(keys.mongoURI);
//initialize the server
const server = express();
require('./routes/authRoutes')(server);
//connect mongo database


//middleware


//next();


//routes


//dynamic port binding
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  chalkAnimation.rainbow(`The server is running on port ${PORT}`);
});