const { server } = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

const { pass, user } = require('./src/config.js');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${user}:${pass}@ds015879.mlab.com:15879/backendweek`, {
  useMongoClient: true
});

server.listen(port, () => {
  console.log(`We have liftoff on ${port}`);
})
