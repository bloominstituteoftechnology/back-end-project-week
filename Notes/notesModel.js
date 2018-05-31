const mongoose = require("mongoose")

const noteModel = {
  title: { 
      type: String, 
      required: true, 
    },
  content: { 
      type: String, 
      required: true, 
    },
  tags: {
    type: Array,
    default: []
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
};

const noteSchema = new mongoose.Schema(noteModel);

module.exports = mongoose.model('Note', noteSchema);