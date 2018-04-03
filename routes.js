const userController = require('./Controllers/userController');

module.exports = app => {
    app.route('/login').post(userController.userLogin);
    app.route('/new-user').post(userController.createUser);
}