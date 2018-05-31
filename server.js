const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose')
const cors = require('cors');

const noteRouter = require('./backEnd/Routes/noteRoutes');
const userRouter = require('./backEnd/Routes/userRoutes');

const server = express();
server.use(cors({}));
server.use(helmet());
server.use(express.json());

server.use('/api/notes', noteRouter)
server.use('/api/users', userRouter)

mongoose
.connect('mongodb://markstez05:Cheese12!@ds139970.mlab.com:39970/lambdanotes')
.then(conn => {
    console.log('\n=== Connected to M-Lab Server! ===\n');
})
.catch(err => console.log('error connecting to mongo', err));



server.get('/', (req, res) => {
    res.json({Msg:'hai there'})
});



const port = process.env.PORT || 5050;
server.listen(port, () => {
    console.log(`\n\n THUNDER CATS ARE GO ON http://localhost:${port}!!!`)
});