const MONGOOSE = require('mongoose')

const Notes = new MONGOOSE.Schema({
  title: {
    type: String,
    maxlength: [30, 'The title field may only contain a maximum of 30 characters.']
  },
  text: {
    type: String,
    maxlength: [1000, 'The text field may only contain a maximum of 1000 characters.']
  }
},
{
  toObject: {
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id;
    }
  },
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id;
    }
  }
})

module.exports = MONGOOSE.model('Notes', Notes)