require('dotenv').config();
const server = require('./server.js');

const port = process.env.PORT || 8800;

server.listen(port, () => console.log(`\n=Connected to ${port}=`));
