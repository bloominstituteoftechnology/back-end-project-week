const express = require('express');
const router = express.Router();
const users = require('../data/helpers/usersModel')
//const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken');
//const secret = 'shhhthisissecret';
//const cors = require('../data/helpers/cors');
//router.use(cors());

const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};

function protect(req, res, next) {
    const token = req.headers.authorization;
  
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token'}); 
      } else {
        next();
      }
    });
  }
  //************************************************** */
  function generateToken(user) {
    const payload = {
      username: user.username,
    };
    const options = {
      expiresIn: '1h'
    };
    return jwt.sign(payload, secret, options);
  }

/************************************ USERS SECTION ***********************************/
// protect this route, only authenticated users should see it
router.get('/', protect, (req, res) => {
    users.findUsers()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).send(err);
    })
  });
/********* Get Users *************/
/* router.get('/', (req, res) => {
    users.get()
        .then((user) => {
            res.json(user);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The users could not be retrieved." });
        });
}); */

/********* Get Single User *************/
router.get('/:id', (req, res) => {
    const { id } = req.params
    users.get(id)
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The users information could not be retrieved." });
        });
});

/************* Register User *************/
router.post('/register', (req, res) => {
    const user = req.body; 
    console.log("user:", user)
   user.password = bcrypt.hashSync(user.password, 10);
    users.insert(user)
    .then(user => {
        const token = generateToken(user)
       res.status(201).json({id: user.id, token});
       
       // res.status(201)
        //    .json(user)
    
    //.then(ids => {
    // users.findById(ids[0])
    //  users.get(ids[0])
    //  .then(user => {
      //  const token = generateToken(user)
       // res.status(201).json({id: user.id, token});
     //   res.status(201).json({id: user.id});
     // });
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }); 
/************* Login User *************/
router.post('/login', (req, res) => {
    const creds = req.body;
    users.findByUsername(creds.username)
    .then(user => {
        // username valid   hash from client == hash from db
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user)
        // redirect
        res.json({ id: user.id, token });
      } else {
        // we send back info that allows the front end 
        // to display a new error message
        res.status(404).json({err: "invalid username or password"});
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
  });

  //*************************************************** */
  router.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.status(500).send('failed to logout');
      } else {
        res.send('logout successful');
      }
    });
  });
  //*************************************************************** */
  
/************* Delete User *************/
router.delete('/:id', (req, res) => {
    const { id } = req.params

    if (id) {
        users.remove(id)
            .then(user => {
                if (user) {
                    res.json({ message: "The user was successfully deleted" });
                } else {
                    res
                        .status(404)
                        .json({ message: "The user with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res
                    .status(500)
                    .json({ error: "The user could not be removed." });
            });
    }
});

/********* Update User *************/
router.put('/:id', (req, res) => {
    const { id } = req.params
    const newUser = req.body

    if (!newUser.username || !newUser.password) {
        res
            .status(400)
            .json({ message: "Please provide name and password." });
    } else {
       
        if (newUser) {
            users.update(id, newUser)
                .then(user => {
                   
                        
                        if (user) {
                            res
                                .status(201)
                                .json(user);
                        } else {
                            res
                                .status(404)
                                .json({ message: "The user with the specified ID does not exist." })
                        }
                 
                   
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ error: "The user could not be modified." });
                });
        } else {

            res
                .status(404)
                .json({ message: "The user with the specified ID does not exist." })
        }
    }
})


/************* Get Single Project's Actions *************/
/* router.get('/actions/:id', (req, res) => {
    const { id } = req.params;
    projects
        .getProjectActions(id)
        .then(usersActions => {
            if (usersActions === 0) {
                return sendUserError(404, 'No actions in the project', res);
            }
            res.json(usersActions);
        })
        .catch(err => {
            return sendUserError(500, 'Unable to access db', res);
        });
});
 */


module.exports = router;