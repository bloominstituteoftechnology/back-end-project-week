const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const definition = {
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
}
const options = {
  timestamps: true
}

const usersSchema = new Schema(definition, options)

usersSchema.pre('save', function (next) {
  bcrypt
    .hash(this.password, 11)
    .then(hash => {
      this.password = hash;
      next()
    })
    .catch(err => { next(err) })
})

usersSchema.methods.checkPassWord = function (guestPassWord) {
  return bcrypt.compare(this.password, guestPassWord);
}


const usersModel = mongoose.model("User", usersSchema, 'users')


module.exports = usersModel;