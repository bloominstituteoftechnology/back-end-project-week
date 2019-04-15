const mongoose = require("mongoose");

//Borrowing from notes backend: I didn't want to create a separate backend for my portfolio site's 
// contact form, so am using notes app's backend for that functionality.

const contactSchema = new mongoose.Schema({      
  name: {
    type: String,
    required: true
  },  
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  
});



module.exports = mongoose.model("Contact", contactSchema);
