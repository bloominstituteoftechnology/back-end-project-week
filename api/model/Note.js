const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({

});

module.exports = mongoose.model('User', NoteSchema);