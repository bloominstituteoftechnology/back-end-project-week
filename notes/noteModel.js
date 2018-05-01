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
    updated_On: {
        type: Date,
    }
})

noteSchema.pre('save', function(next) {
    now = new Date();
    this.updated_On = now;
    if ( !this.created_On ) {
        this.created_On = now;
    }

    next();
})