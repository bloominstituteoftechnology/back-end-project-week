const server = require('./api/server');

const port = process.env.PORT || 9001;

server.listen(port, () => console.log(`\nServer live on port: ${port}\n`))
