const mongoose = require("mongoose");

const ObjectID = mongoose.Schema.Types.ObjectId;

const contactSchema = new mongoose.Schema({
    ObjectID,
  name: {
    type: String,
    required: true
  },  

  email: {
    type: String,
    required: true,
  },
  message : {
    type: String,
    required: true,
  },
  
});



module.exports = mongoose.model("Contact", contactSchema);
