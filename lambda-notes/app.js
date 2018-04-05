'use strict'
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const session = require('express-session');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const index = require('./api/routes/index');
//const users = require('./api/routes/users');
const notes = require('./api/routes/notes');
const Note = require('./api/models/note');
const app = express();
require('dotenv').config();

const corsOptions = {
  "origin": "http://localhost:3000",
  "credentials": true
};

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
        jwksUri: "https://45h131.auth0.com/.well-known/jwks.json"
    }),
    // This is the identifier we set when we created the API
    audience: '45h131-lambda-notes',
    issuer: '45h131.auth0.com',
    algorithms: ['RS256']
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.MY_SECRET,
  resave: true,
  saveUninitialized: false,
}));

app.use('/', index);
//app.use('/users', users);
app.use('/notes', notes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
