const db = require('../db.js');

module.exports = {
    get: function() {
        return db('post as p')
    },

    getById: function(id) {
        return db('post')
        .where('id', id)
    },

    insert: function(post) {
        return db('post')
        .insert(post)
        .then(ids => ({id: ids[0]}));
    },

    update: function(id, post) {
        return db('post')
        .where('id', id)
        .update(post);
    },

    remove: function(id) {
        return db('post')
        .where('id', id)
        .delete();

    }
}