const Note = require('../Models/Note');
const User = require('../Models/User');

const noteGet = (req, res) => {
  // const author = req.body.username;
  if (req.params.id) {
    const id = req.params.id; // {id: 'asldf;asdlf}  'liasdjflaskd'
    console.log(req.body);
    User.findById(id)
      .then(user => {
        console.log(user);
        res.status(200).json(user.notes);
      })
      .catch(err => {
        res.status(500).json({ Error: `Unable to get notes: ${err}` });
      });
  } else {
    console.log('no id');
  }
};

module.exports = noteGet;
