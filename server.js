const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet')
const passport = require('passport');

const postRoutes = require('./api/post');
const userRoutes = require('./api/user');
const tagsRoutes = require('./api/tags');

server.use(express.json())
server.use(cors());
server.use(helmet())
server.use(passport.initialize());
server.use('/api/post', postRoutes);
server.use('/api/user', userRoutes);
server.use('/api/tags', tagsRoutes);



const port = 5000;
server.listen(port, () => {console.log('API running')});