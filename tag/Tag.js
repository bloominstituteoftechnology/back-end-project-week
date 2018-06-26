const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Tag = new mongoose.Schema({
    name: { type: String, required: true },
    color: { type: String },
}, { collection: 'Tag' });

module.exports = mongoose.model('Tag', Tag);
