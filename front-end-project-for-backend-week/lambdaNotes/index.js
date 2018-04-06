const server = require('./server');
const mongoose = require('mongoose');
const port = 2323;

mongoose.connect('mongodb://localhost/back-end', {}, err => {
  if (err) throw new Error(err);
  console.log('Connected to database.');
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});