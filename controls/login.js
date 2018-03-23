const jwt = require('jsonwebtoken');
const secret =
    process.env.SECRET ||
    'I have got a lovely bunch of coconuts there they are standing in a row big ones small ones some as big as your head';

const login = (req, res) => {
    if (req.email) {
        const payload = {
            email: req.email
        };
        const token = jwt.sign(payload, secret);
        res.json({ token });
    } else {
        res.status(404).json({ error: 'Login Required' });
    }
};

module.exports = {
    login
};
