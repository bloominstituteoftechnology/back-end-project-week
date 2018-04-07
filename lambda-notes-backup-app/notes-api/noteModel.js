const mongoose = require('mongoose');
const Schema = mongoose.Schema; // pulled off a single proprety from Mongoose called Schema
//
const NoteSchema = new Schema({ // Schema is a small portion of what makes up a note model (hey here are the different proprties I expect this thing to have)
  title: {
    type: String,
    required: true,
  }, // base String object inside javascript (special global variable)
  content: {
    type: String,
    required: true,
  }
});
// feed this into Mongoose to make a new note model


const Note = mongoose.model('Note', NoteSchema);
// When we create the user model:
// 1) Mongoose asks Mongo: do we have a collection called 'notes'? If not lets make one
// 2) 2nd argument, by passing UserSchema: hey Mongoose, any time you're working with 'note' we expect them to have a name and it should be a String
// Note is now: Note Class or Note Model (referred to) - This doesn't represent a single note but an entire collection of data

module.exports = Note; // Export the model class out of here so other files can use it