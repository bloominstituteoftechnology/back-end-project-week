require('dotenv').config();
const server = require('./server.js');

const port = process.env.PORT || 9000;

server.listen(port, function() {
    console.log(`\n=== Notes API Listening on http://localhost:${ port } ===\n`);
});