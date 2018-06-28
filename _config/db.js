const mongoose = require('mongoose');
const config = require('../config');

module.exports = {
  connectTo: function () {
    return mongoose.connect(config.mLabDB ? config.mLabDB : config.dbPath);
  },
};