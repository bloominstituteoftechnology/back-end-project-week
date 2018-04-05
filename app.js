const { server } = require('./server');
const mongoose = require('mongoose');

const { port, MONGO_CONNECT } = require('./config');
const PORT = process.env.PORT || port;
const USERNAME = process.env.MLAB_USERNAME;
const PASSWORD = process.env.MLAB_PASSWORD;
const MONGO = process.env.MONGO;

mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://${USERNAME}:${PASSWORD}${MONGO_CONNECT}`)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to database: ', err);
  });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
