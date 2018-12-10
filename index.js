// Imports
const server = require('./server.js');

// Sets up the port for the server
const PORT = 9000;

server.listen(PORT, () => {
  console.log(`=== Server is listening on port ${PORT} ===`);
});
