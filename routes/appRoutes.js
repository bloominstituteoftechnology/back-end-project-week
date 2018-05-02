const ctrlLogin = require('../controllers/loginController');
const ctrlUser = require('../controllers/userController');
const ctrlNotes = require('../controllers/noteController');
const ctrlLogout = require('../controllers/logoutController');
const ctrlAuthentication = require('../middlewares/middleware');

module.exports = server => {
    server.route('/login').post(ctrlLogin.login);
    server.route('/signout').post(ctrlLogout.logout);
    server.route('/').post(ctrlUser.userRegistration);
    server.get('/accounts', ctrlUser.getUsers);
    server.route('/:id').put(ctrlUser.updateUser);
    server.route('/:id').delete(ctrlUser.deleteUser);
    server.route('/:id').post(ctrlNotes.createNote);
    server.get('/:id/:id', ctrlNotes.fetchNote);
    server.route('/:id/:id').put(ctrlNotes.updateNote);
    server.route('/:id/:id').delete(ctrlNotes.deleteNote);
}