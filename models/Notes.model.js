const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const Notes = new Schema({
  title: String,
});

console.log(mongoose.connection);

module.exports = mongoose.model('Notes', Notes);
