const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema ({
    Title: {
        type: String,
        required: true,
        unique: true,
    },

    Date: {
        updated: {type: Date, default: Date.now},
        required: true,
    },
      
    Body: {
        type: String,
    }
})