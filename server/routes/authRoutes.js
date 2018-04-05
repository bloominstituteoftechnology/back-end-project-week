const Note = require('../models/Note');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });

  app.get('/login', function(req, res){
    res.render('login.ejs');
  });

  app.get('/signup', function(req, res) {
    res.render('signup.ejs')
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    Note.find({'_user': req.user.id}, function(err, data) {
      //console.log('back end', data);
      res.render('profile.ejs', { 
        user: req.user,
        data: data
      });
    })

  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/createNote', function(req, res) {
    res.render('createNote.ejs')
  });

  app.post('/createNote', function(req, res) {
    const { title, text } = req.body;
    const newNote = new Note({
      title, 
      text,
      _user: req.user.id
    });
    newNote.save()
      .then(item => {
        res.status(200);
        res.redirect('/profile');
      })
       .catch(err => {
         res.status(400);
         res.redirect('/profile');
    });
  });

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
  
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login'
  }));
};
