const jwt = require('jsonwebtoken');
const Note = require('./note/NoteModel');
const mysecret = 'This is the backend project for lambda. Will have to connect it to the front-end project, from last month.'

const authenticate = (req,res,next) => {
    const token = req.get('Authorization');
    if (token) {
        jwt.verify(token, mysecret, (err, decoded) => {
            if (err) return res.status(422).json(err);
            req.decoded = decoded;
            next();
        });
    }   else {
        return res.status(403).json({
            error: 'No token provided, must be set on the Authorization Header'
        });
    }
};

module.exports = {
    authenticate,
    mysecret
};