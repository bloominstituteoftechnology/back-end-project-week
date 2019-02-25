const db = require('../dbConfig.js');

module.exports = {


    get: async function () {
        return db('notes')
    },

    get: async function (id) {
        let query =  db('notes');
        if (id) {
         query.where('notes.id', id).first();
            return query;
        }
        return db('notes')
    },
 
    insert: function (note) {
        return db('notes')
            .insert(note)
            .then(([id]) => this.get(id));
    },

    update: function (id, changes) {
        return db('notes')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },

    remove: function (id) {
        return db('notes')
            .where('id', id)
            .del();
    }

};
  
