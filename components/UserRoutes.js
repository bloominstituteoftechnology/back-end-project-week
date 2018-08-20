const User = require('./User');

module.exports = server => {
    server.post('/register', (req, res) => {
        const user = new User(req.body);
        user.save()
        .then(user => res.status(201).send(user))
        .catch(err => res.status(500).send(err));
    });
    server.post('/login', (req,res) => {
        const { username, password } = req.body;
        User.findOne({ username }).then(user => {
            if (user) {
                user.isPasswordValid(password).then(isValid => {
                    if (isValid) {
                        req.session.username = user.username;
                        res.send("Access Granted");
                    } else {
                        res.status(400).send("Invalid Password");
                    }
                });
            } else {
                res.status(400).send("Invalid Username");
            }
        }).catch(err => res.send(err));
    });
    server.get('/logout', (req, res) => {
        if (req.session) {
            req.session.destroy(function(err) {
                if(err) {
                    res.send('error logging out, did you login');
                } else {
                    res.send('Goodbye');
                }
            });
        }
    });
  };