const bcrypt = require("bcryptjs")

module.exports = {
 note_check: (req, res, next) => {
  if (id && note.title && note.body) {
   next()
  }
  else {
   res
    .status(400)
    .json({error: "Id, title, and body are required."})
  }
 },

 pw_check: (req, res, next) => {
  if (users.length && bcrypt.compareSync(req.user.password, users[0].password)) {
   next()
  }
  else {
   res
    .status(401)
    .json({error: "Invalid username or password."})
  }
 }
 
}