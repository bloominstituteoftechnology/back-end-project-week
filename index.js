const server = require('./server.js');

const port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log(`*****\nServer running on port ${port}\n*****`);
});