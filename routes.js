const { createUser, userLogin } = require('./Controllers/userController');

module.exports = server => {
    server.route('/new-user').post(createUser);
    server.route('/login').post(userLogin);
};