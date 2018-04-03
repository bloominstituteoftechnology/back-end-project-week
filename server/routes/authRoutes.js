const passport = require('passport');

module.exports = app => {

  // Configure view engine to render EJS templates.
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'ejs');

  // Use application-level middleware for common functionality,         including
  // logging, parsing, and session handling.
  app.use(require('morgan')('combined'));
  app.use(require('cookie-parser')());
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('express-session')({ secret: 'keyboard cat', resave:  false, saveUninitialized: false }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());
    app.get('/',
      function(req, res) {
        res.render('home', { user: req.user });
      }
    );

    app.get('/login',
      function(req, res){
        res.render('login');
      }
    );

    app.post('/login',
      passport.authenticate('local', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      }
    );

    app.get('/logout',
      function(req, res){
        req.logout();
        res.redirect('/');
      }
    );

    app.get('/profile',
      require('connect-ensure-login').ensureLoggedIn(),
      function(req, res){
        res.render('profile', { user: req.user });
      }
    );

 };
