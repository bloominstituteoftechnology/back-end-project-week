const mongoose = require('mongoose');
const config = require('../config');

module.exports = {
  connectTo: function (database = 'sandbox', host = 'localhost') {
    return mongoose.connect(config.dbPath ? config.dbPath : `mongodb://${host}/${database}`);
  },
};