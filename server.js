const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors')
const keys = require('./keys.js');
const cookieSession = require('cookie-session')
server.use(express.json());
server.use(cors({}));
const port = process.env.PORT || 9000;
const passport = require("passport")

const sessionOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
};
server.use(cookieSession(sessionOptions));
server.use(passport.initialize());
server.use(passport.session())

mongoose
  .connect(keys.mongodb.dbURL)
  // .connect('mongodb://hillal20:Settara200@ds233500.mlab.com:33500/lambdanotesdb')
  .then(p => { console.log('=== connected to lambdaNotesDB==') })
  .catch(err => { console.log(`err:${err}`) })

server.get('/', (req, res) => {
  res.status(200).json({ msg: 'api is running!' })
})
//////////////////////////////////////////////////////////////
const lambdaNotesRoute = require('./lambdaNotesRoute.js');
server.use('/notes', lambdaNotesRoute);
const usersRoute = require('./usersRoute.js');
server.use('/users', usersRoute);
const loginRoute = require('./loginRoute.js');
server.use('/login', loginRoute);
////////////////////////////////////////////////////////////////
const googleRoute = require('./googleRoute.js')
server.use('/google', googleRoute);
const googleLoginRoute = require('./googleLoginRoute.js');
server.use('/google/login', googleLoginRoute);
const googleLogoutRoute = require('./googleLogoutRoute.js')
server.use('/google/logout', googleLogoutRoute);
const googleRedirect = require('./googleRedirect.js')
server.use('/auth/google/redirect', googleRedirect);

server.listen(port, () => {
  console.log(`\n=== server is running on ${port} ==`)
})
