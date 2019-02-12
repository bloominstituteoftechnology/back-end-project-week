const server = require('./api/server');

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}.`);
});