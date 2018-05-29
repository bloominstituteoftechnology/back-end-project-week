const mongoose = require("mongoose");

const Budget = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: false
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Budget", Budget);
