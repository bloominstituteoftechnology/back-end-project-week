const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const { Schema } = mongoose;
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    body: {
        type: String,
        required: true
    },
    users: [{ type: ObjectId, ref: 'User'}],
    createdOn: {
        type: Date,
        required: true,
        default: Date.now()
    }
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