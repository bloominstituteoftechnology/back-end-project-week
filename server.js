
const server = require('./api/index.js');

const port = 9000;
server.listen(port, () => console.log(`\n Server is running on port ${port}\n`))