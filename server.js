const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const user_routes = require('./server_user.js');
const posts_routes = require('./server_posts.js');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req,res) => {
res.status(200).json('server working');
})

server.use('/', user_routes);
server.use('/api/posts', posts_routes);

server.listen(3300, () => console.log('\nserver listening on port 3300\n'));