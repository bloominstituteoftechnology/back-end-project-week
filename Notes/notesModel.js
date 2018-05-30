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
};

const noteSchema = new mongoose.Schema(noteModel);

module.exports = mongoose.model('Note', noteSchema);