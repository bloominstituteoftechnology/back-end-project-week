const db = require('../db.js');


module.exports = {
    get: function(userId) {
        const query = db('post as p')
        .join('user as u', 'u.id', 'p.userId')
        .where('u.id', userId)
       return query;
    },

    joinTags: function(postId) {
        const query = db('tags as t')
        return query.join('posttags as tt', 't.id', 'pt.tagId')
        .select('t.tag')
        .where('pt.postId', postId)
    },

    getById: function(id) {
        const query = db('post')
        query.where('id', id),first()
            const promises = [query, this.joinTags(id)]
            return Promise.all(promises).then(function(results) {
                let [posts, tags] = results;
                let post = posts[0];
                post.tags = tags.map(t => {return t});
                return post
            });
    },

    insert: function(post) {
        const query = db('post')
        .insert(post)
        .then(ids => ({id: ids[0]}));

        return query;
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

    },

    addTagToPost: function() {
        return db('posttags as pt')
        .join('tags as t')
        .join('post as p')
        .insert('t.id')
        .where('pt.tagId')
        .insert('p.id')
        .where('pt.postId')
    }
}