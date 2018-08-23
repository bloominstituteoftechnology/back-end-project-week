const server = require('express')()
const bcrypt = require('bcrypt')
const db = require('../../data/db')
const helpers = require('../helpers/helpers')


server.get('/', (req, res) => {
    console.log(process.env)
    res.json("App is currently functioning")
})


// Register users
server.post('/register', (req, res, next) => {
    const { userName, password} = req.body

    if(!userName || !password){
        res.status(400).json({error: "Please include a really really good User Name and Password"})
    }else{
        const credentials = req.body
        const hash = bcrypt.hashSync(credentials.password, 10)
        credentials.password = hash
    
         db('users')
            .insert(credentials)
            .then(function(ids) {
                db('users')
                    .where({ id: ids[0] })
                    .first()
                    .then(user => {
                        // generate web token
                        const token = helpers.generateToken(user)
                        res.status(201).json(token)
                    })
            })
            .catch(next)
    }

})

//Login user
server.post('/login', helpers.getUser, (req, res) => {
    const passwordIn = req.body.password
    const user = req.userIn

    if(bcrypt.compareSync(passwordIn, user.password)){
        const token = helpers.generateToken(user)
        res.status(200).json(token)
    }else{
        return res.status(401).json({"error": "Incorrect Credentials"})
    }
})

// Get all users
server.get('/users', helpers.protected, (req, res) => {
    db('users')
        .select('id', 'userName')
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => res.status(500).json("You shall not pass"))
})


// Logout
server.get('/api/logout', (req, res) => {
    // Find the token specifically
    localStorage.removeItem('jwt')
})


module.exports = server