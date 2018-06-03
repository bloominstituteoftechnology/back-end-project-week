const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect(config.database);
let db = mongoose.connection;

// Check db connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for db errors
db.on('error', function(){
  console.log(err);
})

// Initialize app
const app = express();

// Importing models
let Note = require('./models/note');

// Load View Engine
app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// bodyParser middleware

// parse application
app.use(bodyParser.urlencoded({ extended: false}));
// parse application json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'purple banana',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    let namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']'
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

// Home Route
app.get('/', function(req,res) {
  Note.find({}, function(err, notes){
    if(err){
      console.log(err);
    } else {
      res.render('index',  {
        title:'Lambda Notes',
        notes: notes
      });
    }
  });
});

// Route Files
let notes = require('./routes/notes');
let users = require('./routes/users');
app.use('/notes', notes);
app.use('/users', users);


// Start Server
app.listen(3000, () =>{
  console.log('server started on port 3000');
});