const mongoose = require('mongoose')


const noteDefinition = {
    title: {
        type: String,
        required: true,

    },
    body: {
        type: String,
        required: true,
        
    },
    key: {
        type: Number,
        unique: true
    },
    tag_ids: {
        type: [Number],
    },
    tag: [{ //comes from tags
        type: mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    }],
    author_id: { 
        type: Number
    },   
    author: { //comes from users
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
};

const noteOptions = {
    timestamps: true
};

const NoteSchema = new mongoose.Schema(noteDefinition, noteOptions);

const NoteModel = mongoose.model("Note", NoteSchema, "notes");

module.exports = NoteModel;