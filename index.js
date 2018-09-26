const { server } = require('./server.js');

require('dotenv').config();

server.listen(process.env.PORT, function() {
  console.log(`\n=== Web API Listening ===\n`);
});