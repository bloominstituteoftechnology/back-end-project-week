const notesRouter = require('../notes/notesRouter');

module.exports = server => {
    server.use('/note', notesRouter)
}