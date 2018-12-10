const {server} = require('./server.js');

const port = process.env.PORT || 9000;

server.listen(3300, () => {
    console.log('\n Server listening on port 3300');
});
