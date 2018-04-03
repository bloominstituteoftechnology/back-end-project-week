const { server } = require('./server');
const mongoose = require('mongoose');

const { port } = require('./config');
const PORT = process.env.PORT || port;

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/lambda-notes')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to database: ', err);
  });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
