const {authenticate} = require('../middleware');
const {createUser} = require('./createUser');
const {login} = require('./loginPath');
const {getNote} = require('./displayPath.js');
const {createNotes} = require('./createNotes');

module.exports = server => {
    server.get('/api/notes/view', authenticate, getNote);
    server.route('/api/notes/create').post(authenticate, createNotes);
    server.route('/api/notes/new').post(createUser);
    server.route('/api/notes/login').post(login);
};