const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const definition = {
  username: String,
  googleId: String,
}

const googleUserSchema = new Schema(definition);
const googleUserModel = mongoose.model("GoogleUsers", googleUserSchema)
module.exports = googleUserModel;