const db = require('../data/dbConfig.js');

getNotes = () => {
    return db('notes')
};


addNote = (note) => {
    return db('notes')
        .insert(note)
        .then(ids => ({ id: ids[0] })

        )
};

getNote = (id) => {
    return db('notes')
        .where('notes.id', id)

};



module.exports = {
    getNotes,
    addNote,
    getNote
}
