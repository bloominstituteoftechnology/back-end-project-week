const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8080;
const userController = require('./users/userController.js');

mongoose
  .connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_SERVER}`)
  .then(() => console.log('\n=== connected to mongo ===\n'))
  .catch(err => console.log('error connecting to mongo'));


// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use('/api/register', userController);
// app.use('/api/login', userController);


// set the home page route
app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});