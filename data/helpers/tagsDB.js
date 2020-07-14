const db = require('../db.js');

module.exports = {
    get: function() {
        return db('tags as t')
    },

    getTagById: function(id) {
       return db('tags as t')
            .select('t.tag')
            .where('t.id', id)
    },

    insert: function(tag) {
        const query = db('tags')
        .insert(tag)
        .then(ids => ({id: ids[0]}));
        const promises = [query, addTagToPost()]
        return Promise.all(promises).then(function(results) {
            let [posts, tags] = results;
            let post = posts[0];
            post.tags = tags.map(t => {return t});
            return post
        })
    },

    /*insertPT: function(tagId, postId) {
        return db('posttags as pt')
        .insert(tagId, postId)
        .then(ids => ({id: ids[0]}))
    },*/

    update: function(tag, id) {
        return db('tags as t')
        .where('t.id', id)
        .update(tag);
    },

    remove: function(id) {
        return db('tags as t')
        .where('t.id', id)
        .delete();

    },

   /* getPostTags: function() {
        return db('posttags')
    },*/

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