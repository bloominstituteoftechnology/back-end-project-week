const db = require('../../data/db')
const jwt = require('jsonwebtoken')

const secret = "nobody tosses a dwarf!"

module.exports = {
    getUser: function(req,res,next) {
        let { userName } = req.body
        try{
            db('users')
                .where({ userName })
                .first()
                .then(user => {
                    if(user){
                        req.userIn = user
                        next()
                    }else{
                        res.status(500).json({error: "Error with user name or password"})
                    }
                })
        }catch(err){
            res.status(500).json({error: "Error with user name or password"})
        }
    },

    generateToken: function(user){
        const payload = {
            userName: user.userName,
            department: user.department
        }

        const options = {
            expiresIn: '1h',   // 15 minutes
            jwtid: '12345'
        }

        return jwt.sign(payload, secret, options)
    },

    protected: function(req, res, next) {
        const token = req.headers.authorization;
        
        if (token) {
          jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
              return res
                .status(401)
                .json({ error: 'you shall not pass!! - token invalid' });
            }
      
            req.jwtToken = decodedToken;
            next();
          });
        } else {
          return res.status(401).json({ error: 'you shall not pass!! - no token' });
        }
    }
}