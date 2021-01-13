const bcrypt = require('bcryptjs');

const { authenticate, generateToken } = require('./middlewares.js');

const db = require('../database/dbConfig.js');

module.exports = server => {
    server.post('/register', register);
    server.post('/login', login);
}

//USERS REGISTER  and  LOGIN 
//======= FUNCTION TO SEE REGISTER NEW USERE '/api/register' ========
function register(req, res) {
    // implement user registration
    console.log("req.body  : ", req.body);
    const credentials = req.body;
    
    const hash = bcrypt.hashSync(credentials.password, 6);
    credentials.password = hash;
    db('users').insert(credentials)
               .then(ids => {
                    res.status(201).json(ids);
                })
               .catch(err => res.send(err));
}

//======= FUNCTION LOGIN ========
function login(req, res) {
    // implement user login
    const credentials = req.body;
    db('users')
          .where({ username : credentials.username })
          .first()
          .then(user => {
              if(user && bcrypt.compareSync(credentials.password, user.password)) {
                    const token = generateToken(user);
                    res.status(200).send({message : "Logged In", token});
              } else {
                    res.status(401).json({message : "Invalid username or password.."})
              }
           })
          .catch(err => res.send({Message : "Error in Logging In..."}));
}
