const server = require('./api/server.js');
const express = require("express");
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');
require('./models/User.js');
require('./services/passport.js');

mongoose.connect(keys.mongoURI);

server.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

server.use(passport.initialize());
server.use(passport.session());

require('./routes/authRoutes.js')(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`\n---<Server Running On ${PORT}>---\n`));