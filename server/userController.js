const express = require('express');
const router = express.Router();
const User = require('./userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'canolis are delish';
const session = require('express-session');

function restricted (req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            req.jwtPayload = decodedToken; 
            if (err) {
                return res
                .status(401)
                .json({ message: 'Please sign in'});
            }
            next ();
        });
    } else {
        res.status(401).json({ message: 'Please create account by registering'})
    }
}


const sessionOptions = {
    secret: secret ,
    cookie: {
      maxAge: 1000 * 60 * 60, // an hour
    },
    httpOnly: true,
    secure: false,
    resave: true,
    saveUninitialized: false,
    name: 'noname',
  };



  
  function protected(req, res, next) {
    if (req.session && req.session.username) {
      next();
    } else {
      res.status(401).json({ message: 'you shall not pass!!' });
    }
  }



module.exports = getUser = router.get('/user', restricted, (req, res) => {
    
    User.find()
    .select('password')
    .then(users => {
        res.json(users);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

module.exports = createUser = (req, res) => {
    const { userName, password} = req.body;
    User.create({ userName, password})
    .then(user => {
        const payload = {
            userName: user.userName
        };
        const token = jswt.sign(payload, secret);
        res.status(201).json({ user: user.userName, token});
    })
    .catch(err => res.status(500).json(err));

};

router.post('/login', (req, res) => {
    const { userName, password, notes, id } = req.body; 

    User.findOne({ userName, password })

        .then(user => {
            res.json(`Hello ` + user.userName.toUpperCase());
        })
        .catch( err => {
            res.status(400).json({error: `incorrect`});
        })
    .catch(err => {
        res.status(500).json({error: err.message});
    })
});


router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.send('error logging out');
        } else {
          res.send('good bye');
        }
      });
    }
  });

// needs authentication 
router.get('/profile', (req, res) => {
    const { userName, notes , id } = req.body
    User.find()
    .then(user => {
        res.json({ user }); 
    })
    .catch(err => {
        res.json({error: 'Sorry, but no'})
    })
    
});

router.delete('/profile/:id', (req, res) => {
    const { _id } = req.body;
    const loggedInId = req.user._id;

    User.remove( { _id }  )
    .then(loggedInId => {
        res.json({ loggedInId });
    })
    .catch(err => {
        res.json({error: err.message});
    })
});


// router.delete('/:id', (req, res) => {
//     Note.remove()
//     .then(deletedNote => {
//         res.json({note: deletedNote, message: 'Your note has been deleted'});
//     })
//     .catch(err => {
//         res.status(500).json({error: err.message});
//     })
// });


/*/////////////////////////////////////////////////*/


// delete
// put
// get by id


// router.get('/notelist', (req, res) => {
//     // const { title, body } = req.body;

//     Note.find()
//     .then(notes => {
//         res.json(notes );
//     })
//     .catch(err => {
//         res.send({err: 'no notes to display'})
//     });
// });

// router.post('/createnote', (req, res) => {
//     const { title, body } = req.body; 
//     Note.create({ title, body })
//     .then(note => {
//         res.json(note);
//     })
//     .catch(err => {
//         res.status(500).json({error: err.message});
//     });
// });

// router.delete('/:id', (req, res) => {
//     Note.remove()
//     .then(deletedNote => {
//         res.json({note: deletedNote, message: 'Your note has been deleted'});
//     })
//     .catch(err => {
//         res.status(500).json({error: err.message});
//     })
// });

// router.put('/:id', (req, res) => {
//     const { title, body } = req.body;
//     const { id } = req.params;

//     Note.findById(id)
//     .then(note => {
//     Note.update({ title, body })
//     .then(updatedNote => {
//         res.json({note: updatedNote, message: 'Your note has been updated.'});
//     })
//     .catch(err => {
//         res.status(400).json({error: 'You cannot update this note.'});
//     })
//     })
//     .catch(err => {
//         res.status(500).json({error: err.message});
//     })  
// });



module.exports = router;

