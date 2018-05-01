const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');

const server = express();
// This middleware needs to know about the server.  The middleware we create, we are going to
// move into the middleware.js file
// This is really short hand for two things. Giving server.js access to middleware.js AND
// then passing server into setupMiddleware -- ex. setupMiddleware(server); on a second line.
const setupMiddleware = require('./setup/middleware')(server); 

const setupRoutes = require('./setup/routes')(server);

// remember you can check if mongo is running by typing `mongo` in the terminal, and typing `show dbs`
// You could seperate this into its own file called 'connect2mongodb', similar to what we did above
// with the middleware if you wanted.
mongoose
  .connect('mongodb://<dbuser>:<dbpassword>@ds211440.mlab.com:11440/my-notes')
  .then(cnn => {
    console.log('\n=== connected to mongo ===\n');
  })
  .catch(err => {
    console.log('\n=== ERROR connecting to mongo ===\n');
  });



server.listen(5000, () => console.log('\n=== API on port 5k ===\n'));

// Class Question: Why don't you just run `yarn nodemon server.js` in the command line?
// Luis' Answer:  You could do this.  You would have to be sure that you installed nodemon globally though.
// As it is, you just install nodemon as a dev dependency and then type in the script 'start' command,
// and then you can just type `yarn start` to start your server.  Doing it this way means that you do
// not need to have nodemon globally installed on your system.
