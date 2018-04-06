const noteSchema = require('../models/noteSchema');
const userSchema = require('../models/userSchema');

const postNote = (req, res) => {
  const { title, text, userId } = req.body;
  const date = new Date();
  const note = { title, text, date };
  const Note = new noteSchema(note);

  Note
    .save()
    .then(note => {
      const id = note._id;
      userSchema.findOneAndUpdate({ _id: userId }, { $push: { notes: id } })
        .then(() => {
          res.status(200).send(note);
        })
        .catch(err => res.send(err));
    })
    .catch(err => res.send(err));
};
module.exports = { postNote, };
