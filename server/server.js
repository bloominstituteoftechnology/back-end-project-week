const express = require ('express');
const cors = require('cors');
//const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');
const mongoose = require('mongoose');

const server = express();

const corsOptions = {
	origin: 'https://nostalgic-kilby-8372d8.netlify.com',
	credentials: true,
};
//updated with front end info so that CORS doesn't block my info
server.use(cors(corsOptions));

setupMiddleware(server);
setupRoutes(server);
//this makes it so my server.js isn't too long and I can call in my middleware and routes from elsewhere

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${process.env.MLABUSER}:${process.env.MLABPASSWD}@ds018538.mlab.com:${process.env.MLABPORT}/notes`, {}, err => {
	if (err) {
		console.log('\n===error connecting to mongodb ===\n')
		} else {
		console.log('\n===connected to mongodb ===\n')
		}
	});

//oof this was hard to set up correctly but I finally got mlab working and then set env variables in heroku so that I wouldn't have all my login credentials floating around in github

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n=== API up on port: $(port) === \n`));
	

