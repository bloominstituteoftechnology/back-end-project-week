const db = require('../db');
const m = require('./mapper');

module.exports = {
    get: function (id) {
        let query = db(`notes as t`);
        if (id) {
            query.where('t.id', id).first();
            const promises = [query, this.getTags(id)];
            return Promise.all(promises).then(function (results) {
                let [note, tags] = results;
                note.tags = tags;
                return m.recordToBody(note);
            });
        }

        return query.then(notes => {
            return notes.map(note => m.recordToBody(note));
        });
    },
    getTags: function (id) {
        return db('tags')
            .where('noteId', id)
            .then(tags => tags.map(tag => m.subRecordToBody(tag)));
    },
    add: function (record) {
        return db('notes as t').insert(record).then(([id]) => this.get(id));
    },
    edit: function (id, changes) {
        return db('notes as t')
            .where('t.id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },
    drop: function (id) {
        return db('notes as t').where('t.id', id).del();
    }
}
