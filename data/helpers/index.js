const db = require('../db');

module.exports = {
    get: function (id) {
        let query = db(`notes as n`);
        
        if (id) {
            query.where('n.id', id);
        }

        return query;
    },
    add: function (note) {
        if(note.tags.length > 0) {
            note.tags = note.tags.join(', ');
            // console.log(record);
        }

        return db('notes as n').insert(note).then(([id]) => this.get(id));
    },
    edit: function (id, note) {
        if(note.tags.length > 0) {
            note.tags = note.tags.join(', ');
        }

        return db('notes as n')
            .where('n.id', id)
            .update(note)
            .then(count => (count > 0 ? this.get(id) : null));
    },
    drop: function (id) {
        return db('notes as n').where('n.id', id).del();
    }
};
