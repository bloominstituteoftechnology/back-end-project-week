const { logIn } = require('../Controllers/authController');
const { getTokenForUser } = require('../Controllers/authController');
const { validateToken } = require('../Controllers/authController');
const { createNote } = require('../Controllers/noteController');
const { getNotes } = require('../Controllers/noteController');
const { editNote } = require('../Controllers/noteController');
const { deleteNote } = require('../Controllers/noteController');
const { createUser } = require('../Controllers/userController');




module.exports = server => {
    server
        .route('users', createUser)      
        .route('login', logIn)
        .route('notes', createNote)
        .get('/notes', validateToken, getNotes)
        .post(validateToken, editNote)
        .delete('delete', deleteNote)
};