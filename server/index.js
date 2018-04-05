const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const passport = require('passport');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
require('./models/Note');

const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);

require('./services/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
//app.set('views', __dirname + '/views');

app.use(session({ secret: 'keyboard cat', resave:  false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app, passport);

app.listen(PORT);
console.log('The magic happens on port ' + PORT);
