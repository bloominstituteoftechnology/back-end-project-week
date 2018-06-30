const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secret = 'Secret is yours';

const User = require('../userModel/userModel.js')

function generateToken(user){
    console.log("testing helper function");
    const options = {
        expiresIn: '1h'
    }
    //sign the token
    const payload = { name: user.username }
    return jwt.sign(payload, secret, options)
}

const validateToken = (req, res, next) => {
    // this piece of middleware is taking the token delivered up to the server and verifying it
    // if no token is found in the header, you'll get a 422 status code
    // if token is not valid, you'll receive a 401 status code
    const token = req.headers.authorization;
    if (!token) {
        res
            .status(422)
            .json({ error: 'No authorization token found on Authorization header' });
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res
                    .status(401)
                    .json({ error: 'Token invalid, please login', message: err });
            } else {
                // token is valid, so continue on to the next middleware/request handler function
                next();
            }
        });
    }
};

// function restricted(res, req, next){
//     const token = req.headers.authorization;
//     if(token){
//         jwt.verify(token, secret, (err, decodedToken => {
//             if(err){
//                 res.status(401).json({ message: "Does not pass verification" })
//             }
//             next();
//         }))
//     }else{
//         res.status(401).json({ message: "Does not pass token" })
//     }
// }

router
    .get('/list', validateToken, (req, res) => {
            User
                .find()
                .select('username')
                .then(user => {
                    console.log("/list : ", user)
                    res.status(200).json({ user })
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ errorMessage: err })
                })
        })
        
    
    

router
     .post('/register', (req, res) => {
        const { username, password } = req.body;
        const user = new User({ username, password });

        user.save((err, user) => {
            if (err) return res.send(err);
            const token = generateToken({ username: user.username });
            console.log(token);
            res.json({ token });
        });
    });

    

router  
    .post('/signin', (req, res) => {
        const { username, password } = req.body;
        console.log("req.body : ", req.body);
        console.log(typeof password);
        User.findOne({ username })
            .then(user => {
                if(user){
                    user
                    .validatePassword(password)
                    .then(passwordsMatch => {
                        if (passwordsMatch){
                            //generate token
                            const token = generateToken(user);
                            //send token back to the client
                            res.status(200).json({ message : `welcome ${username}!`, token })
                        } else {
                            res.status(401).json({ errorMessage: 'Passwords fail to match invalid credentials' })
                        }
                    })
                    .catch(err => {
                        res.send('error comparing passwords');
                    });
                    } else {
                        res.status(401).send('invalid credentials')
                    }
                })
                .catch(err => {
                    res.send(err);
                })
        })

module.exports = router;