const mongoose = require('mongoose');
const server = require('./server');

const port = 2323;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lambdaNotes', {}, err => {
  if (err) throw new Error(err);
  console.log('DB up and running');
});


server.listen(port, () => {
  console.log(`Magic happening on port ${port}`);
});

