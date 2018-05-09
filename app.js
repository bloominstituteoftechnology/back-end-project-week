const server = require('./server.js');
const config = require('./config.json');
const serverPORT = process.env.PORT || config.PORT;

server.listen(serverPORT, () => {
    console.log(`Server is running at port ${config.PORT}`);
});