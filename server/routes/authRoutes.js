const passport = require('passport');

//const User = mongoose.model('users');

module.exports = app => {
  app.get('/',
    function(req, res) {
      res.render('index.ejs');
    }
  );

  app.get('/login',
    function(req, res){
      res.render('login.ejs');
    }
  );

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login'
  }));

  app.get('/signup', 
    function(req, res) {
      res.render('signup.ejs')
    }
  );

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile',
    failureRedirect : '/signup',
  }));

  app.get('/logout',
    function(req, res){
      req.logout();
      res.redirect('/');
    }
  );

  app.get('/profile', isLoggedIn,
    function(req, res){
      res.render('profile.ejs', { user: req.user });
    }
  );

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }

 };
