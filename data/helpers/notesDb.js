const db = require('../db');

module.exports = {
    get: id => {
        let query = db('notes');
        if (id) {
            const promises = [query.where('id', id).first(), db('tags').where('note_id', id)];
            return Promise.all(promises).then(results => {
                if (results[1].length > 0) {
                    let [note, tags] = results;
                    note.tags = tags.map(t => ({ id: t.id, tag: t.tag }));
                    return note;
                }
                results[0].tags = [];
                return results[0];
            });
        }
        return query;
    },
    insert: note => {
        return db('notes').insert(note).then(ids => ({ id: ids[0] }));
    },
    update: (id, note) => {
        return db('notes').where('id', id).update(note);
    },
    remove: id => {
        return db('notes').where('id', id).del();
    }
}