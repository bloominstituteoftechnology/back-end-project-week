const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
// require models
require('./models/user');
require('./models/note');
require('./services/passport');

const routes = require('./routes');
const config = require('./config/config');
const handleErrors = require('./middlewares/handleErrors');

mongoose.Promise = global.Promise;
mongoose.connect(config.database);

app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use('/api', routes) // api/notes
app.use(handleErrors);

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});
