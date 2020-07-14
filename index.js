require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 9000;

server.listen(port, () => console.log(`\n ** server up on port ${port} **\n`));
