const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const schema = new Schema({
  notes: [{ type: ObjectId, ref: 'Note' }],
  name: String,
  username: {
    type: String,
    index: true,
    lowercase: true,
    minlength: 4,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

schema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12)
  next();
});

schema.methods.compare = async function (pw, cb) {
  try {
    const match = await bcrypt.compare(pw, this.password)
    cb(null, match)
  } catch (err) {
    cb(err)
  }
}

module.exports = mongoose.model('User', schema)
