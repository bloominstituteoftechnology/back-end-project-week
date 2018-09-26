const dbEngine=process.env.db||'development';
const config=require('../knexfile.js')[dbEngine];

module.exports=require('knex')(config);