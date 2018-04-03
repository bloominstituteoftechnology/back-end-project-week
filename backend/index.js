/* eslint-disable no-console */
const mongoose = require('mongoose');
const server = require('./server');

const PORT = process.env.PORT || 5050;

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/lambdanotes')
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(err => console.error('Failed to connect to MongoDB!', err));

// Connect to express server
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
