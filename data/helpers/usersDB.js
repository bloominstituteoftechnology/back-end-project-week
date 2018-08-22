const db = require('../db.js');

module.exports = {
    get: function() {
        return db('user')
    },

    insert: function(user) {
        return db('user')
        .insert(user)
        .then(ids => ({id: ids[0]}));
    },

    login: function(credentials) {
        return db('user')
        .where({username: credentials.username})
        .first()
         
    },

    update: function(user, id) {
        return db('user as u')
        .where('u.id', id)
        .update(post);
    },

    remove: function(id) {
        return db('user as u')
        .where('u.id', id)
        .delete();

    }
}