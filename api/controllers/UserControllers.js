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
  } catch(e) {
    console.log(e);
  }
}

const getAllNotes = async function(req, res) {
  const uuID = req.params.uid;
  try {
    const currentUser = await User.findById(uuID);
    res.status(201).send(currentUser.notes);
  } catch(e) {
    console.log("There was a problem with fetching the notes", e);
  }
}

const deleteNote = async function(req, res) {
  console.log('The params are', req.params);
  const noteUID = req.params.id;
  const userUID = req.params.userUID;
  try {
    console.log(`Got some params: userUID is ${userUID} and noteUID is ${noteUID}`);
    const updatedProfile = await User.findByIdAndUpdate(userUID,
      { $pull: { notes: { _id: noteUID } } }
    );
    console.log('Updated profile:', updatedProfile);
    res.status(200).send(updatedProfile.notes);
  } catch(e) {
    console.log(e);
  }
}

const editNoteById = async function(req, res) {
  const noteUID = req.params.id;
  const userUID = req.params.userUID;
  const { noteTitle, noteText } = req.body;

  const editedNote = new Note({
    title: noteTitle,
    body: noteText,
  });
  try {
    const currentUser = await User.findById(userUID);
    const newNotes = currentUser.notes.map(note => {
      if (note._id.toString() === noteUID.toString()) {
        return editedNote;
      } else {
        return note;
      }
    });
    await User.findOneAndUpdate(
      { _id: userUID },
      { $set : { notes: newNotes } }
    );
    const updatedProfile = await User.findById(userUID);
    res.status(200).send(updatedProfile);
  } catch(e) {
    console.log(e);
  }
}

module.exports = {
  createUser,
  login,
  createNewNote,
  getAllNotes,
  deleteNote,
  editNoteById,
};