const knex = require("../database/db.js");
const db = {

	getAll() {
		return knex("posts");
  },
  
	addPost(newPost) {
		return knex.insert(newPost).into("posts");
  },
  
	getById(post_id) {
    return knex("posts as p")
      .join('users as u', 'u.id', 'p.user_id')
      .join('posts_tags_links as ptl', 'ptl.post_id', 'p.id')
      .join('tags as t', 't.id', 'ptl.tag_id')
      .where({ post_id })
      .select('text', 'name', 'tag');
  },
  
	updatePost(id, updatedPost) {
		return knex("posts")
			.where({ id })
			.update(updatedPost);
  },
  
	nuke(id) {
		return knex("posts")
      .where({id})
      .del();
  },
  
  getTagsByPost(post_id) {
    return knex('tags').select('tag').join('posts_tags_links', function() {
        this.on('posts_tags_links.post_id', 'post_id')
        this.andOn('posts_tags_links.tag_id', 'tags.id')
    }).where({ post_id });
  },

};

module.exports = db;
