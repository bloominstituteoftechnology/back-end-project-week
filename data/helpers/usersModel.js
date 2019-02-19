const db = require('../dbConfig.js');

module.exports = {


    get: function () {
        return db('users')
    },

    get: function (id) {
        let query = db('users');
        if (id) {
            query.where('users.id', id).first();
            return query;
        }
        return db('users')
    },

    insert: function (user) {
        return db('users')
            .insert(user)
            .then(([id]) => this.get(id));
    },

    update: function (id, changes) {
        return db('users')
            .where('id', id)
            .update(changes)
            .then(count => (count > 0 ? this.get(id) : null));
    },

    remove: function (id) {
        return db('users')
            .where('id', id)
            .del();
    },

    findByUsername: function (username) {
        return db('users').where('username', username).first();
    },

    findById: function (id) {
        return db('users').where('id', id).first();
    },

    findUsers: function () {
        return db('users').select('id', 'username');
    },

    find: function () {
        return db('users').select('id', 'username');
    }

};

