const jwt = require('jsonwebtoken');
const { mysecret } = require('../middleware');

const Note = require('../note/NoteModel');

const login = (req, res) => {
    const { username, password } = req.body;
    Note.findOne({ username }, (err, user) => {
        if (err) {
            res.status(403).json({ error: 'Invalid username/password, credentials' });
            return;
        }
        if (user === null) {
            res.status(422).json({ error: 'No user with that username in notes DB' });
            return;
        }
        user.checkPassword(password, (nonMatch, hasMatches) => {
            if (nonMatch !== null) {
                res.status(422).json({ error: 'passwords dont match' });
                return;
            }
            if (hasMatches) {
                const payload = {
                    username: user.username
                };
                const token = jwt.sign(payload, mysecret);
                res.json({ token });
            }
        });
    });
};

module.exports = {
    login
}