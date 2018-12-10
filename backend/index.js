const { server } = require('./server.js');

const port = 9000;

server.listen(port, () => {
	console.log(`\n=== This port is over ${port}!!!`);
});
