const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = require('./userModel');

const noteSchema = new mongoose.Schema ({
    user_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],
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
    },

})

noteSchema.pre('save', function(next) {
    now = new Date();
    this.updated_On = now;
    if ( !this.created_On ) {
        this.created_On = now;
    }

    next();
})


module.exports = mongoose.model('Note', noteSchema);