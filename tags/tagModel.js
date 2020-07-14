const mongoose = require('mongoose');

const TegSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
