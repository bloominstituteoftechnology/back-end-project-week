const note_check = (req, res, next) => {
 if (id && note.title && note.body){
  next()
 }
 else {
  res
   .status(400)
   .json({error: "Id, title and body are required."})
 }
}

module.exports = {
 note_check: note_check
}