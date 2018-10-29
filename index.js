const server = require('./api/apiRoutes');

const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`\nAPI running on ${port}\n`));