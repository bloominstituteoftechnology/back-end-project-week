const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema ({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    created_On: {
        type: Date,
    },
})