require('dotenv').config()
const port = process.env.PORT || 9000;
const server = require('./server/server.js')

server.listen(port, function() {
    console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

module.exports = server;