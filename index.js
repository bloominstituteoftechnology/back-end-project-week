const server = require('./server');
const PORT = process.env.PORT || 42;

server.listen(PORT, () => {
    console.log(`alive and listening on port ${PORT}`);
})