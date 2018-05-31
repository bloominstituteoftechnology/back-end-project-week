const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
});


module.exports = mongoose.model('tag', tagSchema, 'tags');