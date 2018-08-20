const db = require('../db.js');

module.exports = {

    insert: function(user) {
        return db('users as u')
        .insert(user)
        .then(ids => ({id: ids[0]}));
    },

    update: function(user, id) {
        return db('users as u')
        .where('u.id', id)
        .update(post);
    },

    remove: function(id) {
        return db('users as u')
        .where('u.id', id)
        .delete();

    }
}