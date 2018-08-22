const notes = require('./routes/notes')

module.exports = (server) => {
    server.use('/note', notes)
}