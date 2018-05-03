const express = require('express');
const bcrypt = require('bcrypt');
//const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://ajmal:ZargoKhwaga123!@ds111050.mlab.com:11050/notes')
  .then(() => {
    console.log('Connected to Database');
  })
  .catch(error => {
    console.log('Error connecting to the server');
  });

//const friendsController = require('./friends/friendsController');


const server = express();

//server.use(helmet());
server.use(cors(
  {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true // enable set cookie
  }));
server.use(express.json());



const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
const Note = mongoose.model('note', noteSchema);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rePassword: {
    type: String,
    required: true
  }
});

userSchema.pre('save', function (next) {
  console.log('pre save hook');
  bcrypt.hash(this.password, 10, (err, hash) => {
    // 2 ^ 16.5 ~ 92.k rounds of hashing
    if (err) {
      return next(err);
    }

    this.password = hash; // schema

    return next();
  });
});

userSchema.methods.isPasswordValid = function (passwordGuess) {
  return bcrypt.compare(passwordGuess, this.password);
};

const User = mongoose.model('user', userSchema);


server.get('/', (req, res) => {
  Note.find()
    .then(notes => {
      res
        .status(200)
        .json(notes)
    })
    .catch(err => {
      res
        .status(500)
        .json('error: could not get notes from the database');
    })
});

server.post('/', (req, res) => {
  const newNote = new Note(req.body);
  console.log(newNote);
  newNote.save()
    .then(response => {
      res
        .status(201)
        .json(response)
    })
    .catch(error => {
      res
        .status(505)
        .json('error: data could not saved to DB');
    });
});

server.delete('/:id', (req, res) => {
  Note
    .findByIdAndRemove(req.params.id)
    .then(() => {
      Note.find()
        .then(notes => {
          res
            .json(notes)
        })
        .catch(erro => {
          res
            .json('error: refreshing notes failed');
        });
      res.status(200);
    })
    .catch(error => {
      res.status(500).json({ error: 'could not delete the note' });
    });
});

server.put('/:id', (req, res) => {
  const updatedNote = req.body;
  Note
    .findByIdAndUpdate(req.params.id, updatedNote)
    .then(() => {
      Note.find()
        .then(notes => {
          res.json(notes);
        })
        .catch(error => {
          res.json('error: could not refresh the notes');
        })
      res.status(200);
    })
    .catch(error => {
      res.status(500).json({ error: 'error happened in updating your note' });
    });
});


// ############### REGISTERING USER ########################### //

server.post('/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.save()
    .then(response => {
      res
        .status(201)
        .json(response)
    })
    .catch(error => {
      res
        .status(505)
        .json('error: could not registered the user');
    });
});


server.post('/signin', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user) {
        user.isPasswordValid(password)
          .then(Valid => {
            if (Valid) {
              //req.session.name = user.name;
              res.status(200).json({ response: `welcome ${user.name}` });
            } else {
              res.status(401).json({ response: 'you shall not pass!!!' });
            }
          })
          .catch(error => {
            res.json("Error signing in")
          })
      }
    })
    .catch(error => {
      res.json('Error signing in')
    })
});


//server.use('/api/friends', friendsController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
