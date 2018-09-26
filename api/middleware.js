const {jwtKey} = require('../_secrets/keys.js')
const jwt = require('jsonwebtoken')


module.exports = {
    protect
}

function protect(req, res, next){
    const token = req.headers.authorization 
    if (token) {
        jwt.verify(token, jwtKey, (err, decodedToken) => {
            if (err){
                res.status(400).json({message: 'auth err', error: err})
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({message: 'no token. you need to send a token'})
    }
}