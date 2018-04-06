const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/noteModels');
const User = require('./models/userModels');
const server = express();

server.use(express.json);
const PORT = process.env.PORT || 5000;

mongoose 
  .connect('mongodb://localhost/lambdanotes')
	.then(() => console.log('Successfully connected to MongoDB!'))
	.catch(err => console.error('Failed to connect to MongoDB', err));

	server.get('/notes', (req, res) => {
			Note.find({}, (err, notes) => {
					if (err) res.status(500).json('Failure to get notes:', err);
					res.status(200).json(notes);
				});
		 });

server.post('/notes', (req, res) => {
		const { user, title, content } = req.body;
		if (!title || !content)
		res.status(422).json('Notes need a title and content.');
		const getNewNote = new Note({ user, title, content });
		getNewNote
		  .save()
			.then(newlysavedNote => {
					res.status(200).json(newlysavedNote);
					return newlysavedNote;
				})
			 .then(newlysavedNote => {
					 const userId = newlysavedNote.user;
           const newlysavedNoteId = newlysavedNote.id;
					 User.findByIDAndUpdate(
							 userID,
							 { $push: { notes: [newlysavedNoteId] } },
							 (err, res) => {
							   if (err) console.log(err);
								},
							);
					 })
			      .catch(err => res.status(500).json('Error in saving note: ', err));
				});

 server.post('/users', (req, res) => {
		 console.log(req.body);
		 let { username, password } = req.body;
		 if (!username || !password)
		   res.status(422).json('Users need to have a username and password!');
			 const newlycreatedUser = new User({ username, password });
			 newlycreatedUser 
			   .save()
				 .then(newlysavedUser => 
						 res.status(200).json({ message: 'User successfully created!', newlysavedUser })
						);
					});

server.listen(PORT, () => {
		console.log(`Server is listening on port ${PORT}`);
   }); 

