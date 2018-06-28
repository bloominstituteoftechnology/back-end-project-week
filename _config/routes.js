require('dotenv').config();

const noteRoutes = require('../notes/noteRoutes');
const userRoutes = require('../users/userRoutes');
const jwt = require('jsonwebtoken');
const config = require('../config');
// const secret = config.secret;



function restricted(req, res, next) {
    console.log(req.headers)
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, process.env.jwtSecret, (err, decodedToken) => {
            // req.jwtPayload(decodedToken);
            if (err) {
                return res
                    .status(401)
                    .json({ message: 'Unauthorized!' });
            }
            next();
        });
    } else {
        res.status(401).json({ message: 'you shall not pass! no token' });
    }
}

module.exports = function (server) {
    server.get('/', function (req, res) {
        res.send({ api: 'up and running' });
    });
    server.use('/notes', restricted, noteRoutes);
    server.use('/users', userRoutes);
};
