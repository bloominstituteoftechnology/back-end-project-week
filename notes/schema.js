const mongoose = require('mongoose')

const Notes = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [30, 'The note title may only contain a maximum of 30 characters.']
  },
  text: {
    type: String,
    maxlength: [1000, 'The note text may only contain a maximum of 1000 characters.']
  }
},
{
  toObject: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id;
    }
  },
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id;
    }
  }
})

module.exports = mongoose.model('Notes', Notes)