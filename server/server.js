const express = require ('express');
const cors = require('cors');
const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');

const server = express();

setupMiddleware(server);
setupRoutes(server);

db.connectTo('auth')
	.then(() => {
		console.log('\n...API Connected ...\n');
		server.listen(8000, () =>
			console.log('\n===API Running on port 8000 ===\n')
		);
	})
	.catch(err => {
		console.log('\n*** ERROR connecting to MongoDB ***\n', err);
	});
	

