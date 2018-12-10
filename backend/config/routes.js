const db = require('../data/dbConfig.js');

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
		.catch((err) => {
			res.status(404).json({ message: 'Error retrieving notes', err });
		});
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

function createNote(req, res) {
	return 'something';
}

function editNote(req, res) {
	return 'something';
}

function removeNote(req, res) {
	return 'something';
}
