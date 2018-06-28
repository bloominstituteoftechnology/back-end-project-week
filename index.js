const mongoose = require('mongoose');
const { server } = require('./server/server');
const { port } = require('./config');
const { dbURI } = require('./config');

mongoose.connect(dbURI)
  .then(() => {
    console.log('\n*** CONNECTED to database ***\n');
    server.listen(port, () => {
      console.log(`\n*** Listening on port ${port} ***\n`);
    });
  })
  .catch(err => {
    console.log('\n*** ERROR connecting to database ***\n', err);
  });