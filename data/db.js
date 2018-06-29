const mongoose = require('mongoose');
mongoose.Promise = global.Promise; 
require('dotenv').config();

module.exports = {
    connectTo: function() {
        return mongoose.connect(process.env.mongo);
    },
};