const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    tag_body: {
        type: String
    }
});

const tagModel = mongoose.model("Tag", tagSchema, "tags");

module.exports = tagModel;

