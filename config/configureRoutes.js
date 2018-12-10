const notesRouter = require('../notes/notesRouter');

module.exports = server => {
    server.use('/api/notes', notesRouter)
}