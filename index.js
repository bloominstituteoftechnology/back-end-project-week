const server = require('./server.js');

const port = 9000;
server.listen(port, () => {
    console.log(`*****\nServer running on port ${port}\n*****`);
});