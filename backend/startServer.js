// Packages
const mongoose = require('mongoose');
// Models
const Notes = require('./models/Notes');
// Dependencies
const server = require('./server');
// Definitions
const { MONGO_TEST_URI } = require('./utils/secrets');

const startServer = async (server) => {
  try {
    await mongoose.connect(MONGO_TEST_URI);
  } catch(error) {
    console.log('\n=== MongoDB Connection Error ===',error);
    console.log(error);
    return;
  }
  console.log('\n*** MongoDB Connection Successful ***\n');

  // Let's go!!!
  const PORT = process.env.PORT || 5500;
  server.listen(PORT, () => {
    console.log(`\n*** Server listening at ${PORT} ***\n`);
  });
};

startServer(server(Notes));