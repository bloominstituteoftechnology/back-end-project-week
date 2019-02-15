const knex = require('knex');
const knexConfig = require('../../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  insertTags
};

function find() {
  return db('posts');
}

//get post's tags
function getPostTags(postId) {
  return db('tags')
    .join('posttags', 'tags.id', 'posttags.tagId')
    .select('tags.tag')
    .where('posttags.postId', postId);
}

function findById(id) {
  let query = db('posts');
  query.where({ id: Number(id) });
  const promises = [query, getPostTags(id)]; // [ posts, tags ]
  return Promise
    .all(promises)
    .then(function (results) {
      let [posts, tags] = results;
      let post = posts[0];
      post.tags = tags.map(tags => tags.tag);
      return post;
    });
}

function insertTags(postId, tags) {
  const tagsArr = tags.map(x => {
    return { tag: x };
  })
  // console.log(tagsArr);
  tagsArr.map(tag => {
    return db('tags')
      .insert(tag)
      .then(tagIds => {
        // console.log(tagIds);
        insertPostTags(postId, tagIds[0]);
      })
  })
}

function insertPostTags(postId, tagId) {
  const postTag = { postId, tagId };
  // console.log(postTag);
  return db('posttags')
    .insert(postTag)
    .then(ids => ({ id: ids[0] }))
}

function insert(post) {
  return db('posts')
    .insert(post)
    .then(postId => postId);
}

function update(id, post) {
  return db('posts')
    .where('id', Number(id))
    .update(post);
}

function remove(id) {
  return db('posts')
    .where('id', Number(id))
    .del();
}
