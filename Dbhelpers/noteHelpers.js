const db = require('../dbConfig');

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
deleteNote = (id) => {
    return db('notes')
        .where('notes.id', id)
        .del()

};
updateNote = (id, note) => {
    return db('notes')
        .where('notes.id', id)
        .update(note)

};


module.exports = {
    getNotes,
    addNote,
    getNote,
    deleteNote,
    updateNote
}
