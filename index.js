//dependencies
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys')
require('./models/user');
require('./services/passport');
const chalkAnimation = require('chalk-animation');

//connect to external mongodb database
mongoose.connect(keys.mongoURI);
//initialize the server
const server = express();

//middleware
//enabling cookies
server.use(cookieSession({
  // i want this cookie to last 30 days before it will expire
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));
//telling passport to manage our authentication
server.use(passport.initialize());
server.use(passport.session());

//routes
require('./routes/authRoutes')(server);

//dynamic port binding
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  chalkAnimation.rainbow(`The server is running on port ${PORT}`);
});