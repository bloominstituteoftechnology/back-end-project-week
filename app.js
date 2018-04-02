const mongoose = require('mongoose');
const server = require('./server');

const port = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/lambda-notes', {}, err => {
  if (err) throw new Error(err);
  console.log('DB up and running');
});

server.listen(port, () => {
  console.log(`Connected on port ${port}`);
});
