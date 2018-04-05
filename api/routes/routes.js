////// Note Controllers ////////
const { getNotes } = require('../controllers/getNotes');
const { addNote } = require('../controllers/addNote');
////// User Controllers ////////
const { userLogin } = require('../controllers/userLogin');
const { userCreate } = require('../controllers/userCreate');
//////Server Routes ////////
module.exports = server => {
  server.route('/api/login').post(userLogin);
  server.route('/api/notes/:id').get(getNotes);
  server.route('/api/notes/').post(addNote);
  server.route('/api/users').post(userCreate);
};
//