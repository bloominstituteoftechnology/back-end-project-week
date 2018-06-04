const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const definition = {
  title: {
    type: String,
    require: true,
    unique: true
  },
  text: {
    type: String,
    require: true
  }
}
const options = {
  timestamps: true
}

const lambdaNotesSchema = new Schema(definition, options)


const lambdaNotesModel = mongoose.model("LambdaNote", lambdaNotesSchema, 'lambdaNotes')


module.exports = lambdaNotesModel;