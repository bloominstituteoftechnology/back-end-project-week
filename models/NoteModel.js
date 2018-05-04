const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const { Schema } = mongoose;
const User = require('./UserModel');

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    note: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    },
    users: [{ type: ObjectId, ref: 'User'}],
});

NoteSchema.methods.getTitle = function() {
    return this.title;
};

NoteSchema.statics.getAllData = async function() {
    try{
        const data = await NoteSchema.find({});
        return data;
    } catch (error) {
        return error;
    };
};

NoteSchema.path('title').validate(function(title) {
    return title && title.length < 21;
}, 'A title is not a title with description. Keep it less than 21 characters');

module.exports = mongoose.model('Note', NoteSchema, 'notes');