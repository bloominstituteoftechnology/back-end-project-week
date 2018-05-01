const User = require('./UserModel');

server.post('/api/register', (req, res) => {
    const user = new User(req.body);
    user.save()
    .then(newUser => {
        res.status(201).json(newUser);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});
