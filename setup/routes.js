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
  
    app.get('/', (req, res) => {
        res.send({
          dummyData: [
            {
              title: 'Mote Title 1',
              text:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
              id: 1
            },
            {
              title: 'Note Title 2',
              text:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
              id: 2
            },
            {
              title: 'Note Title 3',
              text:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
              id: 3
            },
            {
              title: 'Note Title 4',
              text:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
              id: 4
            },
            {
              title: 'Note Title 5',
              text:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
              id: 5
            },
            {
              title: 'Note Title 6',
              text:
                'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
              id: 6
            }
          ]
        });
      });
  
    app.post('/api/register', function(req, res) {
      const credentials = req.body;
      const user = new User(credentials);
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