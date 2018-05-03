const User = require('../Models/User');
const Note = require('../Models/Note');

const noteAdd = (req, res) => {
  const { title, content } = req.body;
  const author = req.body.username;
  // let id;

  const saveNote = () => {
    // await findUser(author);
    const newestNote = new Note({
      author: req.body.id,
      title: title,
      content: content,
    });
    User.findOneAndUpdate({
      username: req.body.username,
      $push: { notes: newestNote },
    })
      .then(user => {
        console.log(`===USER ID: ===`, req.body.id);
        console.log(`===AUTHOR===:`, author);
        // if (author) {
        // const newNote = new Note({
        //   author: id,
        //   title: title,
        //   content: content,
        // });
        console.log(`===NEW NOTE===`, newestNote);
        newestNote
          .save()
          .then(savedNote => {
            console.log(`Note successfully saved!!! YAY`);
            // user.notes.push(savedNote);
            // user
            //   .save()
            //   .then(response => {
            //     res.status(200).json({
            //       Message: 'User successfully saved with new note!',
            //     });
            //   })
            //   .catch(err => {
            //     res
            //       .status(500)
            //       .json({ Error: `Error saving note to user: ${err}` });
            //   });
          })
          .catch(err => {
            res.status(500).json({ Error: `Unable to save new note: ${err}` });
          });
        // } else {
        //   res.status(422).json({ Error: `User error: ${err}` });
        // }
      })
      .catch(err => {
        res.json({ Error: `Unable to find user ${err}` });
      });
  };

  saveNote();
};

module.exports = noteAdd;
