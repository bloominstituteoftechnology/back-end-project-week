require('dotenv').config();

const mongoose = require('mongoose');
const { server } = require('./server/server');
const PORT = process.env.PORT;
const DB_URI = process.env.MONGODB_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log('\n*** CONNECTED to database ***\n');
    server.listen(PORT, () => {
      console.log(`\n*** Listening on port ${PORT} ***\n`);
    });
  })
  .catch(err => {
    console.log('\n*** ERROR connecting to database ***\n', err);
  });
