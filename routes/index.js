const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');
const NoteController = require('../controllers/note.controller');
const UserController = require('../controllers/user.controller');

const requireLogin = require('../middlewares/requireLogin');
const signup = require('../services/signup');
const validEmail = require('../middlewares/validSignup');
const catchErrors = require('../middlewares/catchErrors');


router.get('/login/local', )

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

module.exports = router;