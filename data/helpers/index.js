const db = require('../db');
let query = db('notes as t');

module.exports = {
    get: function (id) {
        if(id) {
            return query.where('t.id', id).first();
        }

        return query.then(notes => {
            return notes.map(note => this.recordToBody(note));
        });
    },
    add: function (record) {
        return query.insert(record).then(([id]) => this.get(id));
    },
    edit: function () {

    },
    drop: function () {

    },
    recordToBody: function(record) {
        return { ...record };
    }
}
