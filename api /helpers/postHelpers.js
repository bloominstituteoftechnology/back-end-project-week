const db = require('../dbConfig');
const dbPosts = db('posts');
module.exports = (getPostsByUserName,getPostsByID,insertPost,updatePost,deletePost)

const getPostsByUserName = (username) => {
  let query = dbPosts;
  return query
    .where(username, 'username')
};

const getPostsByID = (id) => {
  return dbPosts
  .where(id,'id')
}

const insertPost = (post) => {
  return dbPosts
    .insert(post)
    .then(ids => ({id: ids[0]}));
}

const updatePost = (id,post) => {
  return dbPosts
    .where ('id',id)
    .update(post)
}
const deletePost = (id) => {
  return dbPosts
  .where('id',id)
  .del();
}








module.exports(getPostsByUserName)