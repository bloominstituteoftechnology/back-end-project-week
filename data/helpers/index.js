const db = require('../db');
const m = require('./mapper');

module.exports = {
    get: function (id) {
        let query = db(`notes as t`);

        if (id) {
            query.where('t.id', id).first();

            const promises = [query, this.getTags(id)];

            return Promise.all(promises).then(function (results) {
                let [notes, tags] = results;
                let note = notes[0];
                note.tags = tags.map(t => t.tag);

                return note;
            });
        }

        // return query.then(notes => {
        //     return notes.map(note => m.recordToBody(note));
        // });
        return query;
    },
    getTags: function (id) {
        return db('tags as t')
            .join('note_tags as nt', 't.id', 'nt.tagId')
            .select('t.tag')
            .where('nt.noteId', id);
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
};
