const notesRouter = require('../notes/notesRouter');
const authRouter = require('../auth/authRouter');
const protected = require('../auth/protected');

module.exports = server => {
    server.use('/note', protected, notesRouter);
    server.use('/auth', authRouter);
}
