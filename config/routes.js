const db = require('../data/dbConfig');

module.exports = server => {
    server.get('/', home);
    server.get('/api/notes', notesList);
    server.get('/api/notes/:id', noteById);
    server.post('/api/notes', postNote);
    server.put('/api/notes/:id', updateNote);
    server.delete('/api/notes/:id', deleteNote);
}

function home(req, res) {
    res.status(200).json({ api: 'running' });
}

function notesList(req, res) {
    db('notes')
        .then(note => res.status(200).json(note))
        .catch(error => res.status(500).json(error))
}

function noteById(req, res) {
    const { id } = req.params;
    db('notes')
        .where({ id: id })
        .then(note => res.status(200).json(note))
        .catch(error => res.status(500).json(error));
}

function postNote(req, res){
    db.insert(req.body)
        .into('notes')
        .then(note => res.status(200).json(note))
        .catch(error => res.status(500).json(error));
}

function updateNote(req, res) {
    const { id } = req.params;
    db('notes')
        .where({ id: id })
        .update(req.body)
        .then(note => res.status(200).json(note))
        .catch(error => res.status(500).json(error));
}

function deleteNote(req, res) {
    const { id } = req.params;
    db('notes')
        .where({ id: id })
        .del()
        .then(note => res.status(200).json(note))
        .catch(error => res.status(500).json(error));
}
