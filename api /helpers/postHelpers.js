const db = require('../dbConfig');
const dbPosts = db('posts');

module.exports = {

  getPostsByUserName: (username) => {
    let query = dbPosts;
    return query
      .where(username, 'username')
  },

  getPostsByID: (id) => {
    return dbPosts
      .where(id, 'id')
  },

  insertPost: (post) => {
    return dbPosts
      .insert(post)
      .then(ids => ({ id: ids[0] }));
  },

  updatePost: (id, post) => {
    return dbPosts
      .where('id', id)
      .update(post)
  },
  deletePost: (id) => {
    return dbPosts
      .where('id', id)
      .del();
  }

}