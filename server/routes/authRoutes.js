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
    res.render('profile.ejs', { 
      user: req.user 
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
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
