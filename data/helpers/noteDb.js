const db = require('../dbConfig');

module.exports = {
    get,
    add,
    update,
    remove
};

function get(id) {
    const query = db('notes');
    if (id) {
        query.where('id', id);
    }

    return query.then(notes => {
        if (notes.length === 1) {
            return notes[0];
        }
        return notes
    });
}

function add(note) {
    return db('notes')
    .insert(note)
    .then(ids => ids[0])
}

function update(id, note) {
    return db('notes')
    .where('id', id)
    .update(note)
}

function remove(id) {
    return db('notes')
    .where('id', id)
    .del();
}



