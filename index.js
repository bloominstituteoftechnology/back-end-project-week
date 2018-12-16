require('dotenv').config
const server = require('./data/server.js');

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Running on port ${port}`));