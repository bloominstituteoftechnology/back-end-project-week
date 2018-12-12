const server = require('./api/server');

const port = 8000;

server.listen(port, () => {
    console.log('listening on port 8000');
})