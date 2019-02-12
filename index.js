//set up server listen for testing
require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** server running on port ${port} **\n`));