const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

const notesControllers = {
 
getNotes(req, res, next){
  db("notes")
  .then(notes => {
    if (!notes.length) {
      console.log('notes.length = ', notes.length);
      next();
    }
    res.status(200).json(notes);
  })
  .catch(() => next(new Error("Could not get Notes")));
},


createNote(req, res, next){
  const newNote = req.body;
  db("notes")
  .insert(newNote)
  .then(note => {
    if(!note){
      next();
    }
    res.status(200).json(note);
  })
  .catch(() => next(new Error("Could not create a new Notes"))) 

}

}

module.exports = notesControllers;
