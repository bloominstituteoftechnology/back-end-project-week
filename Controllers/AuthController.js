const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Auths = require("../Schemas/AuthenticationSchema");
require("dotenv")

const tokenGenerator = authUser => {
    const options = {
      expiresIn: '24h'
    }
  
    const payload = { name: authUser.username }
  
    const secret = process.env.SECRET
  
    return jwt.sign(payload, secret, options)
  }

  const login = (req, res) => { //works
    const { username, password } = req.body
    Auths.findOne({ username })
      .then(authUser => {
        if (!authUser) {
          res.status(404).json({ Error: 'user not found' })
        } else {
          authUser
            .validatePassword(password)
            .then(match => {
              if (match) {
                const token = tokenGenerator(authUser)
                res.status(200).json({
                  Message: `Welcome, ${authUser.firstName}, have a token`,
                  token
                })
              } else {
                res.status(400).json({
                  Message: 'username/password combination not found in database'
                });
              }
            })
            .catch(err => {
              res.status(500).json({ Error: err.message });
            });
        }
      })
      .catch(err => {
        res.status(500).json({ Error: err.message });
      });
  }

  const register = (req, res) => { //works
      const {username, password, confirmedPassword, firstName, lastName, cohort} = req.body;
        if(password !== confirmedPassword){
            res.status(400).json({Error: "passwords do not match"})
        } else if(!username, !password, !firstName, !lastName, !cohort){
                res.status(400).json({Error: "must include username, password, firstName, lastName and cohort"})
        }
        Auths.create({username, password, firstName, lastName, cohort})
            .then(auth => {
                res.status(201).json(auth);
            })
            .catch(err => {
                res.status(500).json({Error: err.message});
            });

  }
// "https://lambnotes.herokuapp.com/auth/"
router.route("/login")
    .post(login);
router.route("/register")
    .post(register);




module.exports = router;