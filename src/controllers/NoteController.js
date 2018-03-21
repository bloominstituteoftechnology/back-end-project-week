const Note = require('../models/NoteModel');
const User = require('../models/UserModel');

const createNote = (req, res) => {
	const { title, text } = req.body;
	const { email } = req.decoded;
	User.findOne({ email })
		.then((user) => {
			const userId = user.id
			const note = new Note({ title, text, userId });
			note.save((err, note) => {
				if (err) return res.send(err);
				res.json({ success: true });
			});
		})
		.catch((err) => {
			res.status(500).json({ error: `Could not retreive user: ${err}` });
		});
};

const getNotes = (req, res) => {
	const { email } = req.decoded;
	User.findOne({ email })
		.then((user) => {
			const userId = user.id;
			Note.find({ userId }, (err, notes) => {
				if (err) return res.send(err);
				res.send(notes);
			});
		})
		.catch((err) => {
			res.status(500).json({ error: `Could not retreive user: ${err}` });
		});
}

const getNoteById = (req, res) => {
	const { id } = req.params;
	Note.findById(id)
		.then((note) => {
			if (note) {
				res.status(200).json(note);
			} else {
				res.status(404).json({ message: 'Note not found by that id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: 'Note could not be retreived' });
		});
}

const updateNote = (req, res) => {
	const { id } = req.params;
	Friend.findByIdAndUpdate(id, req.body)
		.then((updatedNote) => {
			if (updatedNote) {
				res.status(200).json(updatedNote);
			} else {
				res.status(404).json({ message: 'Could not find note by that id' })
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `There was an error while updating note: ${err}` })
		});
}

const deleteNote = (req, res) => {
	const { id } = req.params;
	Note.findByIdAndRemove(id)
		.then((removedNote) => {
			if (removedNote) {
				res.status(200).json(removedNote);
			} else {
				res.status(404).json({ message: 'Note not found by that id' });
			}
		})
		.catch((err) => {
			res.status(500).json({ error: `There was an error while deleting note: ${err}` });
		});
}

module.exports = {
	createNote,
	getNotes,
	getNoteById,
	updateNote,
	deleteNote
}






