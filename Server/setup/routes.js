// auth0 = require('auth0-js');

const User = require('../User/userModel');
const Note = require('../Notes/notesModel');
const jwtDecode = require('jwt-decode');

module.exports = function(server) {
  //sanity check route
  server.get('/', (req, res) => {
    if (req.headers.id) {
      console.log(jwtDecode(req.headers.id).nickname);
      token = jwtDecode(req.headers.id);
      User.findOne({ username: token.nickname })
        .then(foundUser => {
          //user exists in db, check secret pw
          if (foundUser) {
            console.log('User found, checking secret pw');
            foundUser.verifySub(token.sub, function(err, isValid) {
              if (err) return done(err);

              if (isValid) {
                console.log('pw match');
                const { _id, notes } = foundUser;
                console.log(notes);
                res.send(notes);
              } else {
                console.log('no pw match');
              }
            });
          }
          //user doesnt exist, create user with secret pw
          else {
            console.log('user not found, creating user');
            userObj = {
              username: token.nickname,
              sub: token.sub,
              notes: []
            };
            user = new User(userObj);
            user
              .save()
              .then(insertedUser => {
                console.log('User Saved');
                res.status(201).send(insertedUser.notes);
              })
              .catch(err => console.log(err));
          }
        })
        .catch(err => {
          console.log('user not found, or user not correct');
          console.log(err);
        });
    }
    //  res.send({ api: 'Up and running' });
  });

  //save updated/new/deleted notes to database
  server.post('/', (req, res) => {
    if (req.headers.id) {
      token = jwtDecode(req.headers.id);
      User.findOne({
        username: token.nickname
      })
        .then(foundUser => {
          //user exists in db, check secret pw
          if (foundUser) {
            console.log('User found, checking secret pw');
            foundUser.verifySub(token.sub, function(err, isValid) {
              if (err) return done(err);

              if (isValid) {
                console.log('pw match');
                foundUser.notes = req.body.notes;
                console.log(req.body.notes);
                foundUser
                  .save()
                  .then(insertedUser => {
                    console.log('User Saved with new Notes');
                    res.status(201).send(insertedUser.notes);
                  })
                  .catch(err => console.log(err));
              } else {
                console.log('no pw match');
              }
            });
          }
          //user doesnt exist, create user with secret pw
          else {
            console.log('user not found, not saving notes');
          }
        })
        .catch(err => {
          console.log('user not found, or user not correct, not saving notes');
          console.log(err);
        });
    }
  });

  /*   //create a new user
  server.post('/api/register', (req, res) => {
    const credentials = req.body;

    // add a pre ('save') hook to the User schema
    //that will hash the password before persisting
    //the user to the database
    const user = new User(credentials);

    //save
    user.save().then(insertedUser => {
      const token = makeToken(insertedUser);

      res.status(201).json({ token });
    });
  }); */

  //   server.post('/api/login', authenticate, (req, res) => {
  //     res.json({ token: makeToken(req.user), user: req.user });
  //   });
};
