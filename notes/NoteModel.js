const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const NotesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    created: {
        type: Date, default: Date.now
    }
    ,user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model("Note", NotesSchema);
