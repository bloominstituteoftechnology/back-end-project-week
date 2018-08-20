const db = require('../db.js');

module.exports = {
    get: function(id) {
        const query = db('tags as t')

        if (id) {
            query 
            .select('t.tag')
            .where('t.id', id)
            return query;
        }
        return query;
    },

    insert: function(tag) {
        return db('tags as t')
        .insert(tag)
        .then(ids => ({id: ids[0]}));
    },

    update: function(tag, id) {
        return db('tags as t')
        .where('t.id', id)
        .update(post);
    },

    remove: function(id) {
        return db('tags as t')
        .where('t.id', id)
        .delete();

    }
}