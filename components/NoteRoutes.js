const Note = require('./Note');
//const { authenticate } = require('./Middleware');

module.exports = server => {
    server.post('/newnote', (req, res) => {
        const note = new Note(req.body);
        note.save()
        .then(note => res.status(201).send(note))
        .catch(err => res.status(500).send(err));
    });
    server.get('/viewnotes', (req, res) => {
        Note.find().then(notes => {
            res.status(200).json(notes);
        }).catch(err => res.status(500).json(err));
    });
    server.get('/viewnote/:id', (req, res) => {
        const { id } = req.params;
        Note.findById(id).then(note => {
            res.status(200).json(note);
        }).catch(err => res.status(500).json(err));
    });
    server.put('/editnote/:id', (req, res) => {
        const { id } = req.params;
        const { title, body } = req.body;
        const updated = { title: title, body: body }
        Note.findByIdAndUpdate(id, updated).then(
            res.status(200).json(updated)
        ).catch(err => res.status(500).send(err));
    });
    server.delete('/deletenote/:id', (req, res) => {
        const { id } = req.params;
        Note.findByIdAndRemove(id).then(
            res.status(200).send('deleted')
        ).catch(err => res.status(500).send(err));
    });
  };