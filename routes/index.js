const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const NoteController = require('../controllers/note.controller');
const UserController = require('../controllers/user.controller');
const requireLogin = require('../middlewares/requireLogin');
const catchErrors = require('../middlewares/catchErrors');





// add requireLogin to restrict people from entering note id without
// being logged in
router.get('/notes/:id',
  catchErrors(NoteController.getNote)
);

router.get('/notes',
  requireLogin,
  catchErrors(NoteController.getNotes)
);

router.post('/notes',
  requireLogin,
  catchErrors(NoteController.writeNote)
);

router.put('/notes/:id',
  requireLogin,
  catchErrors(NoteController.updateNote)
);

router.delete('/notes/:id',
  requireLogin,
  catchErrors(NoteController.deleteNote)
);

// const { requireLogIn } = require('./config/passport').requireLogIn;
// const requireAuth = require('./config/passport').requireAuth;
// const getTokenForUser = require('./config/token');
// const express = require('express');

// module.exports = (app) => {
//   //= =================
//   // Auth-User Routes
//   //= =================

//   // Register a new user
//   app.route('/users')
//     .post(UserController.createUser);

//   // View all the users
//   app.route('/users', requireAuth)
//     .get(UserController.getUsers);

//   // Login an existing user
//   app.route('/login', requireLogIn)
//     .post(AuthController.logIn);

//   //= =================
//   // Note Routes
//   //= =================

//   // require login needs to restrict these routes
//   app.route('/notes',
//     requireLogIn)
//     .get(NoteController.getNotes);

//   app.route('/new-note')
//     .post(NoteController.addNote);

//   app.route('/notes/:id')
//     .get(NoteController.viewNote);

//   app.route('/edit-note')
//     .put(NoteController.editNote);

//   app.route('/notes/:id')
//     .delete(NoteController.deleteNote);

//   // app.get('/notes', NoteController.getNotes)

//   // router.get('/notes', requireLogIn, function(req, res) {
//   //   let token = getTokenForUser(req.user);
//   //   if (token) {
//   //     NoteController.getNotes;
//   //   } else {
//   //     return res.status(403).send({ success: false, msg: 'Unauthorized.' });
//   //   }
//   // })
// }

// router.get('')

module.exports = router;