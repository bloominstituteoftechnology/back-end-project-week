const mongoose = require('mongoose');

module.exports = {
  connectTo: function (database = 'Test', host = 'localhost') {
    return mongoose.connect(`mongodb://${host}/${database}`);
  },
};