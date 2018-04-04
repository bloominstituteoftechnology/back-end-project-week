const mongoose = require('mongoose');

module.exports = {
    connectTo: function(database = 'lambda-notes', host = 'localhost') {
        return mongoose.connect(`mongodb://${host}/${database}`);
    },
};