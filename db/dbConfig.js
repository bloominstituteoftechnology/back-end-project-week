const env = process.env.NODE_ENV || 'development';
const config = require('../knexfile')[env];
console.log('~~~~~~~~~~~~~~~')
console.log(config)

module.exports = require('knex')(config);
