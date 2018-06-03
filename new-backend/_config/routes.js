const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");

const User = require("../users/User");
const mySecret = "Flint still doesnt have clean water";

const localStrategy = new LocalStrategy(function(username, password, done) {
  User.findOne({ username })
    .then(user => {
      if (!user) {
        done(null, false);
      } else {
        user
          .validatePassword(password)
          .then(isValid => {
            if (isValid) {
              const { _id, username } = user;
              return done(null, { _id, username });
            } else {
              return done(null, false);
            }
          })
          .catch(err => {
            return done(err);
          });
      }
    })
    .catch(err => done(err));
});

const jwtOptions = {
  secretOrKey: mySecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

const jwtStrategy = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub)
    .then(user => {
      if (user) {
        const { _id, username } = user;
        done(null, { _id, username });
      } else {
        return done(null, false);
      }
    })
    .catch(err => done(err));
});

passport.use(localStrategy);
passport.use(jwtStrategy);

const passportOptions = { session: false };
const authenticate = passport.authenticate("local", passportOptions);
const protected = passport.authenticate("jwt", passportOptions);

function makeToken(user) {
  const timestamp = new Date().getTime();
  const payload = {
    sub: user._id,
    iat: timestamp,
    username: user.username
  };
  const options = {
    expiresIn: "24h"
  };
  return jwt.sign(payload, mySecret, options);
}

module.exports = function(server) {
  server.get("/", (req, res) => {
    res.json({ message: "all good homie" });
  });

  server.post("/register", function(req, res) {
    User.create(req.body)
      .then(user => {
        const token = makeToken(user);
        const { _id, username } = user;
        res.status(201).json({ _id, username, token });
      })
      .catch(err => res.status(500).json(err));
  });

  server.post("/login", authenticate, (req, res) => {
    res.status(200).json({ user: req.user, token: makeToken(req.user) });
  });

  server.get("/users", protected, (req, res) => {
    User.find()
      .select("username")
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });

  server.get("/notes", protected, (req, res) => {
    console.log("getting all notes");
    Note.find()
      .then(p => {
        res.status(200).json(p);
      })
      .catch(err => {
        res.status(500).json({ msg: "we cant display notes " });
      });
  });

  server.post("/notes", protected, (req, res) => {
    console.log("creating note");
    const note = new Note(req.body);

    note
      .save()
      .then(newNote => {
        res.status(201).json(newNote);
      })
      .catch(err => {
        res.json({ message: "Error creating note", err });
      });
  });

  server.get("notes/:id", protected, (req, res) => {
    console.log("fetching note");
    const { id } = req.params;
    Note.findById(id)
      .then(p => {
        res.status(200).json(p);
      })
      .catch(err => {
        res.status(500).json({ msg: "we cant display the note " });
      });
  });

  server.put("notes/", protected, (req, res) => {
    console.log("updating note");
    const { id, title, content } = new Note(req.body);
    Note.findByIdAndUpdate(id, { title, content })
      .then(updatedNote => res.json({ "note updated": updatedNote }))
      .catch(err => res.status(500).json(err));
  });

  server.delete("/notes", protected, (req, res) => {
    console.log("deleting note");
    const id = req.body.id;
    Note.findByIdAndRemove(id)
      .then(deletedNote => res.json({ "note deleted": deletedNote }))
      .catch(err => res.status(500).json(err));
  });
};
