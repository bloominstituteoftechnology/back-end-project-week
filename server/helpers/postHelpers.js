const db = require('../dbConfig');

module.exports = {

  getPostsByUserName: (username) => {
    let query = db('posts');
    return query
      .where(username, 'username')
  },

  getPostsByID: (id) => {
    return db('posts')
      .where(id, 'id')
  },

  insertPost: (post) => {
    return db('posts')
      .insert(post)
      
  },

  updatePost: (id, post) => {
    return db('posts')
      .where('id', id)
      .update(post)
  },
  deletePost: (id) => {
    return db('posts')
      .where('id', id)
      .del();
  }

}