const User = require('../models/User').User;
const Note = require('../models/User').Note;

const createUser = (req, res) => {
  console.log('About to make a new user');
  const { email, password } = req.body;
  const newUser = { email, password };
  const user = new User(newUser)
  user.save((err, createdUser) => {
    if (err) {
      console.log('There was a problem saving the user to the databse!')
      res.status(422);
      res.send({'Error inserting into users: ': err.message});
      return;
    }
    res.json(createdUser);
  });
};

const login = async function(req, res) {
  const { email, password } = req.body;
  const formattedEmail = email.toLowerCase();
  console.log(formattedEmail);
  try {
    console.log('About to wait for the user...');
    const user = await User.findOne({ email: formattedEmail });
    console.log('Searched for that user in the DB: ', user);
    if (user === null) {
      res.status(422).json({ error: "No user with that email in our DB" });
      return;
    }
    const userIsValidated = await user.checkPassword(password);
    if (userIsValidated) {
      res.status(200).json(user);
    } else {
      res.status(422).json({ error: "Invalid Password!" });
    }
  } catch (err) {
    res.status(403).json({ error: "Invalid email/Password" });
  }
};

const createNewNote = async function(req, res) {
  const { userUID, noteTitle, noteText } = req.body;
  const newNote = new Note({
    title: noteTitle,
    body: noteText,
  });
  try {
    const updatedProfile = await User.findByIdAndUpdate(userUID, { $push: { notes: newNote }});
    res.status(201).send(updatedProfile);
  } catch(e){
    console.log(e);
  }
}

module.exports = {
  createUser,
  login,
  createNewNote
};