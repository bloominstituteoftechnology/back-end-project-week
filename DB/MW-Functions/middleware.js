const bcrypt = require("bcryptjs")

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

const pw_check = (req, res, next) => {
 if (users.length && bcrypt.compareSync(req.user.password, users[0].password)) {
  next()
 }
 else {
  res
   .json({error: "Invalid username or password."})
 }
}

module.exports = {
 note_check: note_check
}