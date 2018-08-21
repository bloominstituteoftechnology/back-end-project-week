const db = require('../dbConfig');

module.exports = {
    get,
    add,
    update,
    remove
};

function get(id) {
    const query = db('Notes');
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
    return db('Notes')
    .insert(note)
    .then(ids => ids[0])
}

function update(id, note) {
    return db('Notes')
    .where('id', id)
    .update(note)
}

function remove(id) {
    return db('Notes')
    .where('id', id)
    .del();
}



