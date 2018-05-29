const mongoose = require('mongoose');

const Note = new mongoose.Schema({

    
        title:{
            type:String,
            required: true,
        },
        textbody: {
            type:String,
            required: true,
        },
        createdOn:{
            type:Date,
            default: Date.now,
        },
   
})

module.exports = mongoose.model('Note', Note)

