const server = require('./server/server');
const db = require('./db/db');

/**
 * CONNECT TO DATABASE: Connect to MongoDB.
 */
db.connectTo('lambda_notes_sandbox')
  .then(() => console.log('\n... API Connected to Database ...\n'))
  .catch(err => console.log('\n*** ERROR Connecting to Database ***\n', err));

/**
 *  SERVER: Launch the API
 */
const port = process.env.PORT || 6666;
server.listen(port, () => {
  console.log(`Server up and running on ${port}`);
});
