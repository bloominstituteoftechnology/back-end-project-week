require('dotenv').config();
const server = require('./api/server.js');

const port = process.env.PORT || 5333;

server.listen(port, () =>
    console.log(`\nserver up on port ${port}\n`))