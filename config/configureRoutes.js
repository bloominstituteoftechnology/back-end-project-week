const notesRouter = require('../notes/notesRouter');
const authRouter = require('../auth/authRouter');

module.exports = server => {
    server.use('/note', notesRouter);
    server.use('/auth', authRouter);
}