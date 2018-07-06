const mongoose = require('mongoose');

module.exports = {
    connectTo: function (database = 'back-end-server', host = 'localhost') {
        return mongoose.connect(`mongodb://${host}:27017/${database}`);
    },
}; 