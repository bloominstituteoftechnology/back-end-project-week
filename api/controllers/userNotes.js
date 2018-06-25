const Notes = require('../models/NotesModel')

//gets all notes created by a user. route is /api/user/:id
const getNoteByUser = (req,res) => {
  const { id } = req.params;

  Notes.find({createdBy: id })
    .populate('createdBy', '-_id username')
    .then(userNotes => {
      res.json(userNotes)
    })
    .catch(err => {
      res.status(500).json({error: "unable to find users notes", err: err.message})
    })
}



module.exports = {
  getNoteByUser
}