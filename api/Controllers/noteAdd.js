const User = require('../Models/User');
const Note = require('../Models/Note');

const noteAdd = (req, res) => {
  const { title, content } = req.body;
  const author = req.body.username;
  let id;

  // const findUser = username => {
  //   User.findOne({ username: req.body.username })
  //     .then(user => {
  //       id = user._id;
  //       console.log(`===USER ID: ===`, id);
  //     })
  //     .catch(err => {
  //       res.json({ Error: `Unable to find user ${err}` });
  //     });
  // };

  const saveNote = () => {
    // await findUser(author);
    User.findOne({ username: req.body.username })
      .then(user => {
        id = user._id;
        console.log(`===USER ID: ===`, id);
        console.log(`===AUTHOR===:`, author);
        if (author) {
          const newNote = new Note({
            author: id,
            title: title,
            content: content,
          });
          console.log(`===NEW NOTE===`, newNote);
          newNote
            .save()
            .then(savedNote => {
              user.notes.push(savedNote);
              user
                .save()
                .then(res => {
                  res.status(200).json(res);
                })
                .catch(err => {
                  res
                    .status(500)
                    .json({ Error: `Error saving note to user: ${err}` });
                });
              res.status(200).json({ Message: 'Note successfully saved!' });
            })
            .catch(err => {
              res
                .status(500)
                .json({ Error: `Unable to save new note: ${err}` });
            });
        } else {
          res.status(422).json({ Error: `User error: ${err}` });
        }
      })
      .catch(err => {
        res.json({ Error: `Unable to find user ${err}` });
      });
  };

  saveNote();
  // try {
  //   saveNote();
  // } catch (err) {
  //   console.log(err);
  // }
};

module.exports = noteAdd;
