const server = require('./api/server');

const port = 9000;
server.listen(port, function () {
    console.log(`\n=*= THIS SUCKAH UP ON ${port} =*=\n`);
});