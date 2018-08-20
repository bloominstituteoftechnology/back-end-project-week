const db = require('../db');
const m = require('./mapper');

module.exports = {
    get: function (id) {
        let query = db(`notes as t`);
        if (id) {
            query.where('t.id', id).first();
            const promises = [query];
            return Promise.all(promises).then(function (results) {
                let [note] = results;
                return m.recordToBody(note);
            });
        }

        return query.then(notes => {
            return notes.map(note => m.recordToBody(note));
        });
    },
    add: function (record) {
        // let query = db(`${tbl} as t`);
        return db('notes as t').insert(record).then(([id]) => this.get(id));
    },
    edit: function (id, changes) {
        // let query = db(`${tbl} as t`);
        return db('notes as t')
            .where('t.id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },
    drop: function (id) {
        // let query = db(`${tbl} as t`);
        return db('notes as t').where('t.id', id).del();
    }
}
