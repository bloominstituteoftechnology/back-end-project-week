const db = require('../db');
let query = db('notes as t');

module.exports = {
    get: function (id) {
        return query.then(notes => {
            return notes.map(note => this.recordToBody(note));
        });
    },
    add: function () {

    },
    edit: function () {

    },
    drop: function () {

    },
    recordToBody: function(record) {
        return { ...record };
    }
}
