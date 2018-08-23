const notes = require('./routes/notes')
const users = require('./routes/users')

module.exports = (server) => {
    server.use('/note', notes)
    server.use('/users', users)
}