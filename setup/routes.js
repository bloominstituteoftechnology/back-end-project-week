module.exports = function(app) {
    // QUESTION: Will I use something like this to post notes OR do I leave that on the front-end???
    //   app.get('/api/hobbits', protected, (req, res) => {
    //     // if you are here, you will receive a list of the hobbits
    //     User.find({ race: 'hobbit' })
    //       .select('-password')
    //       .then(hobbits => {
    //         res.json(hobbits);
    //       })
    //       .catch(err => {
    //         res.status(500).json(err);
    //       });
    //   });
  
    server.get('/', function(req, res) {
        res.send({ api: 'up and running' });
      });
  
    app.post('/api/register', function(req, res) {
      const credentials = req.body;
      const user = new User(credentials);
      if (credentials.username === undefined) {
          res.status(404).json(err)
      }
      user.save().then(inserted => {
        // const token = makeToken(inserted);
        res.status(201).json(inserted);
      });
    });
  
    // app.post('/api/login', authenticate, (req, res) => {
    //   res.json({
    //     success: `${req.user.username}, you are logged in!`,
    //     token: makeToken(req.user),
    //     user: req.user
    //   });
    // });
  };