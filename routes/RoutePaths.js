const {authenticate} = require('../middleware');
const {createNote} = require('./createPath');
const {login} = require('./loginPath');
const {getNote} = require('./displayPath.js');

module.exports = server => {
    server.get('/api/notes/view', authenticate, getNote);
    server.route('/api/notes/new').post(createNote);
    server.route('/api/notes/login').post(login);
};