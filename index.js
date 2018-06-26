const server = require('./server/server');
const db = require('./db/db');

/**
 * CONNECT TO DATABASE: Connect to MongoDB.
 */
db.connectTo('database_name')
  .then(() => console.log('\n... API Connected to Database ...\n'))
  .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));
