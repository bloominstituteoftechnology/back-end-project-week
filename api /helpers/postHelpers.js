const db = require('../dbConfig');

const getPostsByUserName = (username) => {
  let query = db('posts');
  return query
    .where(username, 'username')
};

const insert = (post) => {
  return db('posts')
    .insert(post)
    .then(ids => ({id: ids[0]}));
}

const update = (id,post) => {
  
}








module.exports(getPostsByUserName)