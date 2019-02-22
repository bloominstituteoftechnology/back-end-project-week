const db = require('../dbConfig');

module.exports = {

  getPostsByUserName: (username) => {
    return db('posts').where('username', username)
  },

  getPostByID: (id) => {
    return db('posts')
      .where('id',id)
  },

  insertPost: (post) => {
    return db('posts').returning('id').where('id',id)
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