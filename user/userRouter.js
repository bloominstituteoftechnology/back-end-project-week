const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../user/User');
const wala = require('../wala');


const secret = wala.secret;

function generateToken(user) {
    const options = {
        expiresIn: '1h',
    };
    const payload = { name: user.username };

    return jwt.sign(payload, secret, options);
}

router.get('/', (req, res) => {
    User.find()
        .populate("notes", "-_id -__v -user")
        .select('-password')
        .then(users => {
            console.log("We here", users)
            res.json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password ) {
        res.status(400).json({ error: "Please provide a username, password and email!" });
        return;
    }
    User.create(req.body)
        .then(({ username }) => {
            const token = generateToken({ username });
            res.status(201).json({ username, token });
        })
        .catch(err => res.status(500).json(err));
});

router.post('/login', (req, res) => {
    const { username, password } = req.body
    User.findOne({ username })
        .then(user => {
            if (user) {
                user.validatePassword(password)
                    .then(match => {
                        if (match) {                            
                            const { username, _id } = user;
                            const token = generateToken(user)
                            res.status(200).json({ 
                                message: `welcome ${username}!`,
                                token, 
                                userId: _id 
                            })
                        } else {
                            res.status(401).json({ error: 'Invalid credentials, check your username and password!' })
                        }
                    })
                    .catch(err => {
                        res.status(500).json(`{ error: error processing information. error: ${err}}`)
                    })
            } else {
                res.status(401).json({ error: 'Invalid credentials, check your username and password!' })
            }
        })
        .catch(err => {
            res.status(500).json(`{message: something bahd! error: ${err}}`)
        })
})


router.put('/:id', (req, res) => {
    const { id } = req.params.id;
    const { username, email } = req.body;
    console.log("1Bahd!", id)
 User.findByIdAndUpdate(req.params.id, {username, email})
.then(function(user) {
    console.log("Bahd!", user)
  res.status(200).json(user);
})
.catch(function(error){
  res.status(500).json(`{Put message: something bahd! error: ${error}}`)
  })
})

router.post('/:id', (req, res) => {
    const { id } = req.params.id;
    const {_id, newPassword, verifyPassword } = req.body;
    User.findById(_id)
    .then(function(user) {
      if (user) {
          console.log("this user", user.username)
        if (newPassword === verifyPassword) {
          user.password = bcrypt.hashSync(req.body.newPassword, 11);
          console.log("New pass", user.password)
          user.save(function(err) {
              if (err) {
                  return res.status(422).send({
                      message: err
                    });
                } 
                res.status(200).json(user);
          });
        } else {
          return res.status(422).send({
            message: 'Passwords do not match'
          });
        }
      }
    })
    .catch(function(error){
        res.status(500).json(`Reset message: something bahd! error: ${error}`)
        })
  })




module.exports = router;