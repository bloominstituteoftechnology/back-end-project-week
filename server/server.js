const express = require ('express');
const cors = require('cors');
const setupMiddleware = require('./_config/middleware');
const setupRoutes = require('./_config/routes');
const mongoose = require('mongoose');

const server = express();

//I tried setting up multiple origins with CORS but was never able to get it working correctly. Eventually I gave up and just stuck with the one origin due to time constraints. I would like to eventually figure this out, however.
//const whitelist = ['localhost:3000', 'http://nostalgic-kilby-8372d8.netlify.com', 'https://nostalgic-kilby-8372d8.netlify.com']
//const corsOptions = {
//	origin: function (origin, cb) {
//		if(whitelist.indexOf(origin) !== -1) {
//			cb(null, true)
//		} else {
//			cb(new Error('Not allowed by CORS'))
//		}
//	}
//}

const corsOptions = {
	origin: 'http://nostalgic-kilby-8372d8.netlify.com',
	credentials: true,
};
//My husband tried to create and edit on my site and it turns out I had httpsEverywhere activated and then just cut and pasted the link here. CORS accepted all of my edits because it was coming from https://nostalgic.kilby but not his because his was coming from http://nostalgic.kilby. Important lesson learned.

server.use(cors(corsOptions));

setupMiddleware(server);
setupRoutes(server);
//this is set up so that I can pull middleware and all my routes from other files, so my server.js doesn't get too unwieldy

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${process.env.MLABUSER}:${process.env.MLABPASSWD}@ds018538.mlab.com:${process.env.MLABPORT}/notes`, {}, err => {
	if (err) {
		console.log('\n===error connecting to mongodb ===\n')
		} else {
		console.log('\n===connected to mongodb ===\n')
		}
	});
//this was tough to write but once I figured mLab out I got it working. Setting up the env variables was easy - I just followed the heroku documentation. This way, I don't have my mlab credentials all over github.

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`\n=== API up on port: $(port) === \n`));
	

