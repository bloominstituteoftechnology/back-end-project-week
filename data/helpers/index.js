const db = require('../db');
const tbl = 'notes';

module.exports = {
    get: function (id) {
        let query = db(`${tbl} as t`);
        if (id) {
            query.where('t.id', id).first();
            const promises = [query];
            return Promise.all(promises).then(function (results) {
                let [note] = results;
                return this.recordToBody(note);
            });
        }

        return query.then(notes => {
            return notes.map(note => this.recordToBody(note));
        });
    },
    add: function (record) {
        let query = db(`${tbl} as t`);
        return query.insert(record).then(([id]) => this.get(id));
    },
    edit: function (id, changes) {
        let query = db(`${tbl} as t`);
        return query
            .where('t.id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },
    drop: function () {

    },
    recordToBody: function(record) {
        return { ...record };
    }
}
