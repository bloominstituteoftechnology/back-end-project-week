const { server } = require('./server');
const mongoose = require('mongoose');

const { port, MONGO_CONNECT } = require('./config');
const PORT = process.env.PORT || port;

mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://${MONGO_CONNECT}`)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to database: ', err);
  });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
