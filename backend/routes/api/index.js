const express = require('express');
const server = express();
const handlers = require('../handlers')

server.get('/users', handlers.getUsers)
server.get('/notes', handlers.getNotes)

server.get('/notes/:note_id/user/:user_id/', handlers.verifyUser, handlers.verifyNote, handlers.getANote)
server.get('/notes/user/:user_id', handlers.verifyUser, handlers.getUserNotes)

server.post('/notes/user/:user_id', handlers.verifyUser, handlers.postNote)
server.post('/register', handlers.register)
server.post('/signin', handlers.signIn)

server.delete('/notes/:note_id/user/:user_id/', handlers.verifyUser, handlers.verifyNote, handlers.deleteNote)
server.delete('/users/:user_id/', handlers.verifyUser, handlers.deleteUser)

module.exports = server;