const { server } = require('./server');

const port = 3333;

server.listen(port, () => {
    console.log(`\n=== Server Running on port:${port} @ http://localhost:${port}/ ===`);
});