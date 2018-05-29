const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const { username, password} = require('./config');
const routes = require('./components/UserRoutes')
const User = require('./components/User');

mongoose
.connect(`mongodb://{username}:{password}@ds139970.mlab.com:39970/lambda-notes`)
.then( con => {
	console.log('\n==> connected to mongo <==\n');
})
.catch(err => console.log('error connecting to mongo', err));


const server = express();



const sessionConfig = {
	secret: 'learn chinese',
	cookie: {
		maxAge: 15 * 60 * 1000,
	},
	httpOnly: true,
	secure: false,
	resave: true,
	saveUninitialized: false,
	name: 'backend',
	store: new mongoStore({
		url: 'mongodb://{username}:{password}@ds139960.mlab.com:39960/sessions',
		ttl: 60 * 10,
	}),
};

server.use(express.json());
server.use(session(sessionConfig));
server.use(CORS());

routes(server);



server.get('/', (req, res) => {
	if(req.session && req.session.username) {
		res.send('welcome back');
	} else {
		res.send('please login');
	}
});



server.listen(5000, () => {
	console.log('\n==> Server listening on port 5000 <==\n');
});