const Note = require('../notes/Note.js');
const User = require('../users/User.js');

const newNote = (req, res) => {
  const { title, content } = req.body;
  console.log('newnote', req.body);

  const note = new Note({ title, content });

  note.save().then(added => {
    const id = added._id;
    const { username } = req.body;
    User.findOneAndUpdate({ username }, { $push: { notes: id } }).then(() => {
      console.log(username);
      res.json(added);
    });
  });
};

module.exports = { newNote };
