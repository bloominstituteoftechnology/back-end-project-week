const mongoose = require('mongoose');

module.exports = {
  connectTo: function(database = process.env.DATABASE || 'sandbox', host = process.env.DB_HOST || 'localhost') {
    // if there are variables in the .env connecto to that Mongo instance, else connect to localhost instance.
    return process.env.DB_MONGO_CLUSTER
      ? mongoose.connect(process.env.DB_MONGO_CLUSTER)
      : mongoose.connect(`mongodb://${host}/${database}`);
  },
  disconnect: function() {
    return mongoose.disconnect();
  },
};
