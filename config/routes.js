const userRouter = require('../users/userRouter');
const noteRouter = require('../notes/noteRouter');
const authRouter = require('../auth/authRouter');

module.exports = function(server) {
    server.get('/', function(req, res) {
        res.send({ api: 'Up and running...' });
    });

    server.use('/api/users', userRouter);
    server.use('/api/notes', noteRouter);
    server.use('/api/auth', authRouter);
};