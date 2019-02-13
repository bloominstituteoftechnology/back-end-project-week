const db = require('../dbConfig');

const getPostsByUserName = (username) => {
let query = db('posts');
return query 
.where(username, 'username')
}








module.exports(getPostsByUserName)