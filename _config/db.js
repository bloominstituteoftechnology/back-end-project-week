const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {
    connectTo: function () {
        return mongoose.connect(process.env.mongo, {
            uri_decode_auth: true
        });
    }
}; 