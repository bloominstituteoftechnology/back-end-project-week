const dbEngine= process.env.DB || 'production';
const config = require('../knexfile.js')[dbEngine];

module.exports = require('knex')(config);