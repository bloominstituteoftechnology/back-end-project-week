const dbEngine='development';
const config=require('../knexfile.js')[dbEngine];

module.exports=require('knex')(config);