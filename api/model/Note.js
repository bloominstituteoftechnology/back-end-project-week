const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const { Schema } = mongoose;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userId: { type: ObjectId, ref: 'User' }
}, {
    timestamps: { createdAt: 'created', updatedAt: 'updated'}
});

module.exports = mongoose.model('Note', NoteSchema);