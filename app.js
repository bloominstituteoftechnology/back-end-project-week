const mongoose = require('mongoose');
const server = require('./server');
const port = process.env.PORT || 5000;

mongoose.connect(
  'mongodb://test:test@ds163769.mlab.com:63769/lambda-notes-project',
  {},
  err => {
    if (err) return console.log(err);
    console.log('Connected to Mongo');
  }
);

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`Server running on ${port}`);
});
