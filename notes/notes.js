const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const notes = new mongoose.Schema({
    created: {
        type: Date,
        Default: Date.now()
    },
    title: {
        type: String,
        required: true
    },
});