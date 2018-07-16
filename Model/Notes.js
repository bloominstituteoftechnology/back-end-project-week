const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema ({
    _id: Schema.types.ObjectId,
    Title: {
        type: String,
        required: true,
        unique: true,
    },

    Date: {
        updated: {type: Date, default: Date.now},
        required: true,
    },
      
    Content: {
        type: String,
    }
})