const express = require ('express');
const cors = require('cors');
const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');

const server = express();

const corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};

server.use(cors(corsOptions));

setupMiddleware(server);
setupRoutes(server);

db.connectTo('notes')
	.then(() => {
		console.log('\n=== API connected to mongodb ===\n');
		server.listen(8000,() =>
			console.log('\n=== mongodb connected port 8000 ===\n')
		);
	})
	.catch(err => {
		console.log('\n === error connecting to mongodb === \n')
	});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n=== API up on port: $(port) === \n`));
	

