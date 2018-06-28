const express = require ('express');
const cors = require('cors');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');
const mongoose = require('mongoose');

const server = express();

const corsOptions = {
	origin: 'https://nostalgic-kilby-8372d8.netlify.com',
	origin: 'http://nostalgic-kilby-8372d8.netlify.com',
	credentials: true,
};
server.use(cors(corsOptions));

setupMiddleware(server);
setupRoutes(server);

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${process.env.MLABUSER}:${process.env.MLABPASSWD}@ds018538.mlab.com:${process.env.MLABPORT}/notes`, {}, err => {
	if (err) {
		console.log('\n===error connecting to mongodb ===\n')
		} else {
		console.log('\n===connected to mongodb ===\n')
		}
	});

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n=== API up on port: $(port) === \n`));
	

