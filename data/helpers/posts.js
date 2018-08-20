const db = require('../db.js');

module.exports = {
    get: function(id) {
        const query = db('posts as p')

        if (id) {
            query 
            .select('p.title', 'p.content')
            .where('p.id', id)
            return query;
        }
        return query;
    },

    insert: function(post) {
        return db('posts as p')
        .insert(post)
        .then(ids => ({id: ids[0]}));
    },

    update: function(post, id) {
        return db('post as p')
        .where('p.id', id)
        .update(post);
    },

    remove: function(id) {
        return db('post as p')
        .where('p.id', id)
        .delete();

    }
}