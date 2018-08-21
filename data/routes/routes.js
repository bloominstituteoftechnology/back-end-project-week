const db = require('../dbConfig.js');

module.exports = server => {
    server.post('/api/createnotes', createNotes);
    server.get('/api/notes', getNotes);
    server.get('/api/notes/:id', existNotes);
    server.put('/api/editnotes', editNotes);
    server.delete('/api/deletenotes', deleteNotes);
};

function getNotes(req, res) {
    db.select()
     .table('notes')
     .then(response => {
         res.status(200).json(response);
     })
     .catch(err => { res.status(500).json(err)});
};

function existNotes(req, res) {
    const id = req.params.id;

    let query = db('notes');
    
    if(id) {
        query.where('id', id).first();
    }

    return query;
}

function createNotes(req, res) {
const createnotes = req.body;

    db('notes')
     .insert(createnotes)
     .where(ids => ({ id: ids[0] }))
     .then(response => {
         res.status(201).json(response = createnotes);
     })
     .catch(err => {
         res.status(500).json({err});
     });
};

function editNotes(req, res) {
    const editNotes = req.body;

    db('notes')
     .where('id', id)
     .update(editNotes)
     .then(response => {
        res.status(201).json(response = editNotes);
    })  
     .catch(err => {
        res.status(500).json({err});
    });
};

function deleteNotes(req, res) {
    const id = req.params.id;
    
    db('notes')
     .where('id', id)
     .del()
     .catch(err => {
        res.status(500).json({err});
    });
};