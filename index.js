const server = require('./server');

const PORT = 8000;
server.listen(PORT, () => console.log(`LISTENING == ${PORT} === ACTIVE`));
