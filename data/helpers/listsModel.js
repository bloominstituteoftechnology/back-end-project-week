const db = require('../dbConfig.js');

module.exports = {


    get: async function () {
        return db('lists')
    },

    get: async function (id) {
        let query = db('lists');
        if (id) {
            await query.where('lists.id', id).first();
            return query; 
        }
        return db('lists')
    },

    insert: async function (list) {
        return db('lists')
            .insert(list)
            .then(([id]) => this.get(id));
    },

    update: function (id, changes) {
        return db('lists')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },

    remove: function (id) {
        return db('lists')
            .where('id', id)
            .del();
    },
};
