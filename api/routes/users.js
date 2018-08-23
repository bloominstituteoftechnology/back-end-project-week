const server = require('express')()
const bcrypt = require('bcrypt')
const db = require('../../data/db')
const functions = require('../helpers/helpers')


server.get('/', (req, res) => {
    console.log(process.env)
    res.json("App is currently functioning")
})


// Register users
server.post('/register', (req, res, next) => {
    const { userName, password, department } = req.body

    if(!userName || !password || !department){
        res.status(400).json({error: "Please include a valid User Name, Department and Password"})
    }
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
                    const token = functions.generateToken(user)
                    res.status(201).json(token)
                })
        })
        .catch(next)
})

//Login user
server.post('/login', functions.getUser, (req, res) => {
    const passwordIn = req.body.password
    const user = req.userIn

    if(bcrypt.compareSync(passwordIn, user.password)){
        const token = functions.generateToken(user)
        res.status(200).json(token)
    }else{
        return res.status(401).json({"error": "Incorrect Credentials"})
    }
})

// Get all users
server.get('/users', functions.protected, (req, res) => {
    console.log(req)
    db('users')
        .select('id', 'userName', 'department')
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