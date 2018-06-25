const mongoose = require('mongoose');

module.exports = {
    connectTo: function() {
        return mongoose.connect('mongodb://iqra:P12345@ds217351.mlab.com:17351/notesprojectdb');
    },
};