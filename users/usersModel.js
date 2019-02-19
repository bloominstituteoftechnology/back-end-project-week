const db = require('../data/dbConfig.js');

module.exports = {
    get: function(id) {
        if(id) {
            return db('users').where('id', id)
            .then(users => {
                return users[0]
            })
        }
        else {
            return db('users')
        }
    },

    insert: function(user) {
        if (user.username && user.password) {
            return db('users').insert(user)
        }
        else {
            return 'Please enter a user with a username and password.'
        }
    },

    update: function(id, changes) {
        return db('users').where('id', id).update(changes)
            .then(users => {
                return users[0]
            })
    },

    remove: function(id) {
        return db('users').where('id', id).del()
    }
}