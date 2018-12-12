
const server = require('./api/index.js');

const port = process.env.PORT || 9000;

const port = 8000;
server.listen(port, () => console.log(`\n Server is running on port ${port}\n`))