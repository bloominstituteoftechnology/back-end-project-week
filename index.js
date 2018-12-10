require('dotenv').config();

const server = require('./api/server.js');

const url = process.env.PORT;

const port = url || 9010;

server.listen(port, () => console.log(`\n ** server up on port ${port} **\n`));
