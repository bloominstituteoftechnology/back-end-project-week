const server = require('./api/server');

const port = env.process.PORT || 9000;

server.listen(port, () => console.log(`\n=== SERVER RUNNING ON ${port} ===\n`));
