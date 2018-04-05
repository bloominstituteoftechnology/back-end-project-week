const server = require('./server.js');
const config = require('./config.json');

server.listen(config.PORT, () => {
    console.log(`Server is running at port ${config.PORT}`);
});