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


// function restricted(req, res, next){
//     const token = req.headers.authorization;
//     console.log(token)
//     if(token){
//         console.log("if successful, run this block of code", token)
//         jwt.verify(token, secret, (err, decodedToken => {
//             req.jwtPayload = decodedToken;
//             if(err){
//                 return res.status(401).json({ message: "Does not pass verification" })
//             }
//             next();
//         }))
//     }else{
//         return res.status(401).json({ message: "Does not pass token" })
//     }
// }

router
    .get('/list', restricted, (req, res) => {
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