const db = require('../data/dbConfig');

module.exports = (server) => {
	server.get('api/notes', getNotes);
	server.get('/api/note/:id', getNote);
	server.post('/api/createnote', createNote);
	server.put('/api/editnote/:id', editNote);
	server.delete('/api/removenote/:id', removeNote);
};

function getNotes(req, res) {
	db('notes')
		.select('*')
		.then((note) => {
			res.status(200).json(note);
		})
		.catch((err) => res.send(err));
}

function getNote(req, res) {
	const note = req.params;
	db('notes')
		.where({ id: note.id })
		.select('*')
		.then((note) => {
			res.json(note);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error retrieving that note', err });
		});
}
