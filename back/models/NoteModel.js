const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = Schema({
    title: {
        type: "String",
        required: true,
        trim: true,
    },
    content: {
        type: "String",
        required: true,
        trim: true,
    }
});

module.exports = mongoose.model("NoteModel", NoteSchema, "Notes");