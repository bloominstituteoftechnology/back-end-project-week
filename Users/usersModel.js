// const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;
// //bcrypt & salt rounds

// //User Model Schema
// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//         minlength: 5,
//         lowercase: true,
//     },
//     password: {
//         type: String, 
//         required: true, 
//         minlength: 5,
//     },
//     notes: [{ 
//         type: ObjectId, 
//         ref: 'Note'}]
// });

// //Add in Bcrypt for PW hashing

// module.exports = mongoose.model("User", userSchema)