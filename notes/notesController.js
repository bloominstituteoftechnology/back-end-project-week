
const db = require('../data/config.js');

// for using in pagination...
const limitNum = 3;

const notesControllers = {
  getNotes(req, res, next) {
    console.log('getNotes in controller ');
    db("notes")
    // .offset(0).limit(limitNum)
    // .offset(3)
    // .limit(3).offset(8)
      .then(notes => {
        if (!notes.length) {
          console.log("notes.length = ", notes.length);
          next;
        }
        res.status(200).json(notes);
      })
      .catch(() => next(new Error("Could not get Notes")));
  },

  async getANote(req, res, next) {
    try {
      const noteID = req.params.id;

      const selectedNote = await db("notes").where("notes.id", noteID).limit(3);

      selectedNote.length
        ? res.status(200).json(selectedNote[0])
        : res
            .status(404)
            .json({ errorMessage: "A note with that ID could not be found." });
    }
    catch (err) {
      next(new Error("Could not get Notes"))
      // res
      //   .status(500)
      //   .json({ error: "The note information could not be retrieved.", err });
    }
  },

  createNote(req, res, next) {
 
    const newNote = req.body;

    db("notes")
      .insert(newNote)
      .then(id => {
        if (!id) {
          next();
        }
        res.status(200).json(id);
      })
      .catch(() => next(new Error("Could not create a new Notes")));
  },

 async editNote(req, res, next) {
  try {
    const {id} = req.params;
    const editedNote = req.body;
    console.log( "editedNote", editedNote);
//    id = Number(id);
// console.log( "why not this?", typeof id);

    const editedID = await db("notes").where("notes.id",id ).update(editedNote);
    console.log( "editedID", editedID);
    editedID
    ? res.status(200).json(editedID)
    : res
        .status(404)
        .json({ errorMessage: "A note with that ID could not be found." });
}
catch (err) {
  next(new Error("Could not edit Notes"));
  }

},

async deleteNote(req, res, next) {
  try {
    const {id} = req.params;

    const deleted = await db("notes").where("notes.id", id).delete();
   
    deleted
    ? res.status(200).json(deleted)
    : res
        .status(404)
        .json({ errorMessage: "A note with that ID could not be found." });
}
catch (err) {
  next(new Error("Could not delete Notes"));
  }

},

 async  searchNote(req, res, next) {
  
//   const query = req.query.query;

//   db('notes').where("notes.title", 'like', `%${query}%`)
//     .orWhere("notes.textBody",'like', `%${query}%`)
//   .then(notes => {
//     if (!notes.length) {
//       console.log("notes.length = ", notes.length);
//       next();
//     }
//     res.status(200).json(notes);
//   })
//   .catch(() => next(new Error("Could not get Notes")));
// },



  try {
    const query = req.query.query;

    const queryNotes = await db('notes').where("notes.title", 'like', `%${query}%`)
                        .orWhere("notes.textBody",'like', `%${query}%`);
   console.log('in searchNote func  queryNotes = ', queryNotes);
  
   // queryNotes ? 
    res.status(200).json(queryNotes)
    // : res
    //     .status(404)
    //     .json({ errorMessage: "No matching note founded" });
}
catch (err) {
  next(new Error("Could not search Notes"));
  }

},

}
module.exports = notesControllers;
