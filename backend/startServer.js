// Packages
require('dotenv').config();
const mongoose = require('mongoose');
// Models
const Users = require('./models/Users');
const Notes = require('./models/Notes');
// Dependencies
const server = require('./server');
// Definitions
const { MONGO_DEMO_URI } = process.env;

const startServer = async (server) => {
  try {
    await mongoose.connect(MONGO_DEMO_URI);
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

startServer(server(Users, Notes));